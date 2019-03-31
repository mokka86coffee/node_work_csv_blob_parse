<p>Module 'querySelector_NodeJS_edition.js' can be used as:
  <b>const parserHtml = require('./querySelector_NodeJS_edition');</b>
</p>
<br>
<p>
<code>const body = parserHtml(html);</code><br>
<code>const parsedName = body.querySelector('p.name')</code>
  <code>   //["<p class='name'>John</p>"]</code>
</p>
<p>
<code>const parsedName = body.querySelector('a[href^="tel"]')</code>
  <code>   //["<a href='tel:123456789'>123456789</a>"]</code>
</p>
<p>
<code>const parsedName = body.querySelectorAll('a[href^="tel"]', {text: true})</code>
<code>   //['123456789','987654321']</code><br><br> </code>
</p>
