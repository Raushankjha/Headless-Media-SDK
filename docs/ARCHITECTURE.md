# Architecture

```text
                    Pexels API
                        |
                        v
                 +-------------+
                 | media-core  |
                 +------+------+ 
                        |
             +----------+----------+
             |                     |
             v                     v
      +-------------+       +-------------+
      | media-react |       | media-native|
      +------+------+       +-------------+
             |
             v
          apps/web
             |
             v
      +----------------+
      | media-ui-react |
      +----------------+
```

`media-ui-react` and `media-ui-native` are independent of both the core SDK and platform wrappers. The app composes data and UI.
