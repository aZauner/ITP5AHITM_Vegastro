@startuml
left to right direction

actor "Person" as User
actor "Restaurantbesitzer" as Owner
rectangle "Frontend"{
[Dashboard]
[Mobile App]
}
rectangle "Backend"{
[NestJS]
}
rectangle "Datenbank"{
[MongoDB]
}
[Mobile App] <. [User]
[Mobile App] <--> [NestJS]
[NestJS] <--> [MongoDB]
[Owner] =.> [Dashboard]
[Owner] =.>  [Mobile App]
[NestJS]<->[Dashboard]
@enduml
