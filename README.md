# Nearmap

- I used the name MyMap to avoid the collision with built-in constructor Map
- I didn't wrap `[select|deselect]City` into `useCallback` to keep the code simpler. If the structure will grow, we can optimize later
- I've tried using more data. On 5k the render takes ~3s and marker click takes ~550ms. But we'd never show that many objects anyway, we'd cluster them
