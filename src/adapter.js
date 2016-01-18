import influx from 'influx'

// InfluxDB client
var getClient = (config) => (config._client = config._client || influx(config))

// Authorization adapter
export let auth = (req, config, data, cb) => {
	cb('InfluxDB authorization not supported.')
}

// Metadata adapter
export let metadata = (req, config, data, cb) => {
	cb('InfluxDB metadata not supported.')
}

// Storage adapter
export let storage = (req, config, data, { SensorData }, cb) => {
	if ( ! (data instanceof SensorData)) return cb('Invalid SensorData given.')

	var point = data.getData()
	var config = {}

	// Determine timestamp
	var timestamp = point.timestamp

	// > Specify time in nanoseconds (https://goo.gl/s60Lhy)
	timestamp = (new Date(timestamp).getTime() || Date.now()) * 1000000

	// > Timestamp was specified in seconds
	if (timestamp < 10000000000000000) timestamp *= 1000

	config.precision = 'ns'

	point.time = timestamp
	delete point.timestamp

	// Determine tags
	var tags = { deviceId: data.getDeviceId() }

	// Write point
	getClient(config).writePoint(config.series, point, tags, config, cb)
}
