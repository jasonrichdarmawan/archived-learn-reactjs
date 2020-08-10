1. defer attribute in `<script>` will not run until after the page has loaded.

    **without the defer attribute, `console.log()` will throw an error.**

    index.html
    ```
    <script src="example.js" defer></script>
    ```

    example.js
    ```
    let idDiv = document.getElementById("example");

    console.log(idDiv.innerHTML);
    ```