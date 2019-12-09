* Use Workers as Webhooks for DataDog events
* Feed Workers data into DataDog
	* Events: https://docs.datadoghq.com/api/?lang=python#post-an-event
	* Logs: https://docs.datadoghq.com/api/?lang=python#send-logs-over-http
	* Metrics: https://docs.datadoghq.com/api/?lang=python#post-timeseries-points
		* https://www.npmjs.com/package/datadog-metrics
	* Authentication
		* `DD-API-KEY` header and `DD-APPLICATION-KEY` headers
* CF has an integration that doesn't have workers: https://app.datadoghq.com/account/settings#integrations/cloudflare
* Can't use dogstatsd b/c can't run daemon but that's OK