Javascript Prototypes Extension Package

The ideas for this package came from closely working with the PHP framework Laravel. My goal was to try to match Laravel's syntax for filtering and sorting through an array of objects. 

Taking that into account, most of this package is focused on extending the Array prototype, although there are some methods added onto the String prototype as well.


Example of using the array prototype extensions.

```
let posts = [
   {name: 'Sunday Morning Post', id: 1, length: 9453, readers: 20000, status: 'published'},
   {name: 'asdfasdfsdf', id: 2, length: 945, readers: 100, status: 'published'},
   {name: 'dasdf', id: 3, length: 119453, readers: 420000, status: 'internationally_published'},
   {name: 'Friday Night Lights', id: 4, length: 3343, readers: 1334, status: 'pending'}, 
];
```

//Example one - where
`let smallPosts = posts.where('readers', '<=', 100);`


`[{name: 'asdfasdfsdf', id: 2, length: 945, readers: 100, status:'published'}]`



//Example two - pluck property
`let names = post.pluck('names');`

`['Sunday Morning Post', 'asdfasdfsdf', 'dasdf', 'Friday Night Lights'];`


//Example three - chaining several find total reader from published posts

`let totalReadersFromActivePosts = posts.where('status', '=', 'published').pluck('readers').sum()`

`numberOfReadersAddedUpFromAllPublishedPosts`



//Example four - find the average number of readers where posts are not published

`let avgReadersForNonPublishedPosts = posts.where('status', '!=', 'published').pluck('readers').avg()`

`avg Number of readers for Non Published Posts`

