---
title: Blog
headline: Mein Notizblog
content:
    items: '@self.children'
    limit: 10
    order:
        by: date
        dir: desc
    filter:
        published: true
    pagination: true
    url_taxonomy_filters: true
feed:
    description: 'Blog von Sebastian Laube'
    limit: 10
pagination: true
---