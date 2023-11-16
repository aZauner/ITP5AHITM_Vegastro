import { HttpException, Injectable } from '@nestjs/common';
// Import the OpenSearch client here
import { Client } from '@opensearch-project/opensearch';
import { DataSet, DeleteInput, searchByKeyword } from './search.dto';
import { RestaurantService } from 'src/restaurant/restaurant.service';

@Injectable()
export class SearchService {
    private readonly openSearchClient: Client;

    constructor(private readonly restaurantService: RestaurantService) {
        // Initialize the OpenSearch client with your configuration
        this.openSearchClient = new Client({
            node: 'https://localhost:9200',
            ssl: {
                rejectUnauthorized: false,
            },
            auth: {
                username: "admin",
                password: "admin"
            }
        });

        this.loadDataIntoIndex();
    }

    async loadDataIntoIndex() {
        await this.openSearchClient.deleteByQuery({
            index: "search_index",
            body: {
                query: {
                    match_all: {}
                }
            }
        });



        let res = await this.restaurantService.findAllRestaurantsWithMeals()
        if (res.length == 0) {
            return;
        }

        await this.bulkDataIngestion({ indexName: "search_index", restaurants: res })
    }

    async bulkDataIngestion(input: DataSet): Promise<any> {
        const body = input.restaurants.flatMap((doc) => {
            return [{ index: { _index: input.indexName, _id: doc.id } }, doc];
        });

        try {
            let res = await this.openSearchClient.bulk({ body });
            return res.body;
        } catch (err) {
            return {
                httpCode: 500,
                error: err,
            };
        }
    }

    async singleDataIngestion(input: DataSet): Promise<any> {
        let restaurant = input.restaurants[0];

        try {
            let res = await this.openSearchClient.index({
                id: restaurant.id,
                index: input.indexName,
                body: {
                    id: restaurant.id,
                    name: restaurant.restaurantName,
                },
            });
            return res.body;
        } catch (err) {
            return {
                httpCode: 500,
                error: err,
            };
        }
    }

    async searchByKeyword(input: searchByKeyword): Promise<any> {
        let body: any;

        // body = {
        //     query: {
        //         multi_match: {
        //             query: input.keyword,
        //             fields: ["restaurantName", "location.city", "location.plz", "location.street", "menu.title", "menu.description", "description"],
        //             slop: 1
        //         }
        //     }
        // };

        body = {
            query: {
                bool: {
                    should: [
                        {
                            multi_match: {
                                query: input.keyword,
                                fields: ["restaurantName"],
                                slop: 1
                            }
                        },
                        {
                            multi_match: {
                                query: input.keyword,
                                fields: ["description"],
                                slop: 1
                            }
                        },
                        {
                            multi_match: {
                                query: input.keyword,
                                fields: ["location.city"],
                                slop: 1
                            }
                        },
                        {
                            multi_match: {
                                query: input.keyword,
                                fields: ["location.plz"],
                                slop: 1
                            }
                        },
                        {
                            multi_match: {
                                query: input.keyword,
                                fields: ["location.street"],
                                slop: 1
                            }
                        },
                        {
                            multi_match: {
                                query: input.keyword,
                                fields: ["menu.title"],
                                slop: 1
                            }
                        },
                        {
                            multi_match: {
                                query: input.keyword,
                                fields: ["menu.description"],
                                slop: 1
                            }
                        }
                    ],
                    minimum_should_match: 2
                }
            }
        }

        try {
            let res = await this.openSearchClient.search({
                index: "search_index",
                body,
            });
            if (res.body.hits.total.value == 0) {
                return {
                    httpCode: 200,
                    data: [],
                    message: `No Data found based based on Keyword: ${input.keyword}`,
                };
            }
            let result = res.body.hits.hits.map((item) => {
                return {
                    _id: item._id,
                    restaurant: item._source,
                };
            });

            return result
        } catch (error) {
            return {
                httpCode: 500,
                data: [],
                error: error,
            };
        }
    }

    async purgeIndex(input: DeleteInput): Promise<any> {
        try {
            await this.openSearchClient.indices.delete({
                index: input.indexName,
            });

            return true
        } catch (error) {
            return false
        }
    }

    async purgeDocumentById(input: DeleteInput): Promise<any> {
        try {
            if (input.id != null && input.indexName != null) {
                await this.openSearchClient.delete({
                    index: input.indexName,
                    id: input.id,
                });
            } else {
                return {
                    httpCode: 200,
                    message: `indexName or document id is missing`,
                };
            }

            return {
                httpCode: 200,
                message: `Record deleted having index: ${input.indexName}, id: ${input.id}`,
            };
        } catch (error) {
            return {
                httpCode: 500,
                message: error,
            };
        }
    }
}
