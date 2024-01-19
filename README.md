# Vegastro 5AHITM


## Starten des Projekts

```
npm i

ionic serve

npm run start:dev

ng serve
```

## Starten von Postgres DB Lokal (Minikube)

```
minikube start

kubectl apply -f .\postgres.yaml

kubectl port-forward deployment/postgres 5432:5432

```

## Starten von Keycloak

```
docker run -p 8080:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:23.0.4 start-dev

```





## Use Case Diagramm
![Use Case Diagramm](https://github.com/aZauner/ITP5AHITM_Vegastro/blob/main/Documents/usecase.png)


## Softwarearchitektur Diagramm
![Softwarearchitektur ](https://github.com/aZauner/ITP5AHITM_Vegastro/blob/main/Documents/softwarearchitektur.png)



