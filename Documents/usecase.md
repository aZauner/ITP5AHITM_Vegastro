@startuml
left to right direction

actor Person as User
actor :Restaurantbesitzer:  as Owner

package "Restaurant" {
  usecase "Filter Restaurants" as UC1
  usecase "Suche nach Ort" as UC2
  usecase "Erstelle Restaurant" as UC3
}

package "Gerichte" {
  usecase "Erstelle Gerichte" as UC4
  usecase "Bearbeite Gerichte" as UC5
  usecase "Aktiviere/Deaktiviere Gerichte" as UC6
  usecase "Sehe Gerichte" as UC7
}

User --- UC1 
User --- UC2
User --- UC7
UC3 --- Owner 
UC4 --- Owner
UC5 --- Owner 
UC6 --- Owner
UC7---Owner


@enduml