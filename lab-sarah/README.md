 # Project Description
 Completed as an assignment for CodeFellows 401 JavaScript course. This project creates a chat room run in the terminal using node. It establishes a connection between a server and client and allows multiple clients to send public or private messages to one another. All commands should be entered into the CLI.
 To set/change your nickname:
   *  '\\nick (nickname)'
 To send a message to ALL clients in the chat room:
   * '\\all (message)'
 To send a direct message to only ONE client in the chat room:
   * '\\dm (recipient) (message)'

 ## Running the project in the terminal
 1. Change directories until you are in the root directory of the project. e.g. on the same level as server.js
 2. From the command line, run 'node server.js' to begin the server


 ## How to connect to the server
 1. Open up a new tab in the terminal
 2. Ensure that you are in the root directory of the project
 3. From the command line, run 'telnet localhost 3000'.
    * If serving from a port besides 3000, run 'telnet localhost (port)'
