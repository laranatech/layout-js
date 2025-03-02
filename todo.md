1. Fit sizing widths
2. grow & shrink sizing widths
3. Wrap text
4. Fit sizing heights
5. Grow & shrink sizing heights
6. positions
7. draw commands

leftOffset
topOffset

Along axis:

```js
padding.left + padding.right + (children.length - 1) * gap + sum(child.width)
```

Cross axis:

```js
padding.top + padding.bottom + max(child.height)
```

opened and closed nodes
