#!/bin/bash

# List of ports
PORTS=(3101)

for port in "${PORTS[@]}"; do
    # Find the process ID using lsof
    pid=$(lsof -t -i:$port)

    # If a process ID is found, kill it
    if [ ! -z "$pid" ]; then
        echo "Killing process on port $port with PID $pid"
        kill -9 $pid
    else
        echo "No process running on port $port"
    fi
done
