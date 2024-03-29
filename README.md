# ⚖️ cache-twitter

Este repositorio está dedicado a la memoria cache del front de la aplicación, conectada con MongoDB Atlas. Creamos un servidor que se queda a la escucha de peticiones realizadas tanto por la página web ([dashboard-twitter](https://github.com/injustweet-tfg/dashboard-twitter)), como por el script encargado de actualizar la "memoria caché" ([update-cache-twitter](https://github.com/injustweet-tfg/update-cache-twitter)). Una vez aceptada la petición HTTP, el servidor utiliza un cliente de la base de datos que  hemos creado para conectarse con ella y realizar la acción que se haya solicitado. 

- En la carpeta **db/** se encuentra el archivo _conn.js_, dedicado a la conexión con MongoDB.
- En la carpeta **routes/** se encuentra el archivo _tweets.js_, donde se encuentran las distintas funciones que atienen las peticiones de get y post que hacen tanto la página web como el script que actualiza la BBDD.


La arquitectura general de cache-twitter se muestra a continuación:

<img src="https://github.com/injustweet-tfg/.github/blob/main/images/arquitectura_cache-twitter.png" width="49%" >

## License

Distributed under the GPL-3.0 License. See [LICENSE](https://github.com/jjavimu/dashboard-twitter/blob/main/LICENSE) for more information.
