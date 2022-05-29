# ⚖️ cache-twitter (from Injustweet)

Este repositorio está dedicado a la memoria cache del front de la aplicación, conectada con MongoDB Atlas. Creamos un servidor que se queda a la escucha de peticiones realizadas tanto por la página web (dashboard-twitter), como por el script encargado de actualizar la "memoria caché" (update-cache-twitter). Una vez aceptada la petición HTTP, el servidor utiliza un cliente de la base de datos que  hemos creado para conectarse con ella y realizar la acción que se haya solicitado. 

- En la carpeta **db/** se encuentra el archivo _conn.js_, dedicado a la conexión con MongoDB.
- En la carpeta **routes/** se encuentra el archivo _tweets.js_, donde se encuentran las distintas funciones que atienen las peticiones de get y post por parte de la página web.


## License

Distributed under the GPL-3.0 License. See [LICENSE](https://github.com/jjavimu/dashboard-twitter/blob/main/LICENSE) for more information.
