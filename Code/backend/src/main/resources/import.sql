-- This file allow to write SQL commands that will be emitted in test and dev.
-- The commands are commented as their support depends of the database
-- insert into myentity (id, field) values(1, 'field-1');
-- insert into myentity (id, field) values(2, 'field-2');
-- insert into myentity (id, field) values(3, 'field-3');
-- alter sequence myentity_seq restart with 4;

insert into Users(id,firstname, lastname, username, email, password) values (100,'Alexander', 'Zauner', 'zauner', 'vegastro@gmail.com', '307fd56085a6ed891cfb2c38276d7853b122968754378f1153e0127f3a764a0f');
-- password 12342
insert into Users(id,firstname, lastname, username, email, password) values (101,'Alexander', 'Zauner', 'zauner1', 'vegastro1@gmail.com', '307fd56085a6ed891cfb2c38276d7853b122968754378f1153e0127f3a764a0f');


insert into location(id,city, plz, street, housenumber, floor) values (100,'Redlham', 4846, 'Au', 77, 4);

insert into Restaurant(id,restaurantName,latitude,longitude,owner_id,type,description,location_id) values (100,'Food Palace', 48.2652888, 14.2453703, 100, 'meat', 'Test Description', 100);

insert into Rating(id,user_id,restaurant_id,stars,comment, date) values(100,100,100,5,'Gutes Essen', '2023-09-29 09:00:00');

insert into ratingupvotes(id,user_id,rating_id) values(100,100,100);