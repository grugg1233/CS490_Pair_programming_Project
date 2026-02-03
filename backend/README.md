### Instructions to run the backend

- cd into backend

- Create the environment using `uv`:
```
uv sync
```

**Note**: You need to have `uv` installed on your machine.

- Run the following command to get backend running:
```
uv run -- flask --app main  run -p 3000
```