const express = require('express')

express.response.ok = function(data){
	this.status(200)
	this.json(data)
}

express.response.error = function(data){
	this.status(400)
	this.json(data)
}