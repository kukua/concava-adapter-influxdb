# ConCaVa InfluxDB adapter

> ConCaVa adapter for storage in InfluxDB.

See [ConCaVa with MySQL and InfluxDB](https://github.com/kukua/concava-setup-mysql-influxdb) for a working setup.

Requires ConCaVa v0.4+.

## Install

```bash
npm install concava-adapter-influxdb
```

## Configure

A ConCaVa configuration example:

```js
import { storage } from 'concava-adapter-influxdb'

export default {
	debug: true,

	...

	storage: {
		method: storage,
		config: {
			host: 'example.com',
			port: 8086,
			protocol: 'http',
			username: 'root',
			password: 'verysecurepassword',
			database: 'concava',
			series: 'SensorData',
		},
	},
}
```
