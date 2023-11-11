#!/bin/sh

ngrok http -subdomain="${NGROK_ACCOUNT}" "${HOST}:${PORT}"
