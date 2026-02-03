import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

//Had to add server -> host:true for docker compose to work https://forums.docker.com/t/dockerize-a-react-vite-application/140270/2 

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
  },
});
