# convert-fetch-event

Convert `FetchEvent` to Node.js-style request handler.

```ts
import { createHandler } from 'convert-fetch-event'

addEventListener('fetch', (event) => {
  const handle = createHandler(event)
  handle((req, res) => {
    res.end('hello')
  })
})
```

## License

MIT &copy; [EGOIST](https://github.com/sponsors/egoist)
