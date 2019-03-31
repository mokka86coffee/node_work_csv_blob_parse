<p>Module 'querySelector_NodeJS_edition.js' can be used as:
  <b>const parserHtml = require('./querySelector_NodeJS_edition');</b>
</p>
<br>
<p>
<code>const body = parserHtml(html);</code><br>
<code>const parsedName = body.querySelector('p.name').innerHTML</code>
  <code>   //["&lt;p class='name'>John&lt;/p>"]</code>
</p>
<p>
<code>const parsedTel = body.querySelector('a[href^="tel"]').innerHTML</code>
  <code>   //["&lt;a href='tel:123456789'>123456789&lt;/a>"]</code>
</p>
<p>
<code>const parsedTels = body.querySelectorAll('a[href^="tel"]').innerText</code>
<code>   //['123456789','987654321']</code><br><br> </code>
</p>
