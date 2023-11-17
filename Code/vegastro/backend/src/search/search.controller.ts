import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SearchService } from './search.service';
import { DataSet, searchByKeyword } from './search.dto';

@Controller('search')
export class SearchController {
    constructor(private readonly searchService: SearchService) { }

    @Post("/bulkData")
    async bulkDataIngestion(@Body() input: DataSet) {
        this.searchService.bulkDataIngestion(input)
        return;
    }

    @Post("/singleData")
    async singleDataIngestion(@Body() input: DataSet) {
        return this.searchService.singleDataIngestion(input)
    }

    @Post("/searchByKeyword")
    async searchByKeyword(@Body() input: searchByKeyword) {
        return this.searchService.searchByKeyword(input)
    }
}
