const insert = document.getElementById("insert");

window.addEventListener("keydown", (e) => {
  insert.innerHTML = `
    <div class="key">
      <table>
        <tr>
          <th>Key</th>
          <th>Code</th>
          <th>Key Code</th>
        </tr>
        <tr>
          <td>${e.key === " " ? "Space" : e.key}</td>
          <td>${e.code}</td>
          <td>${e.keyCode}</td>
        </tr>
      </table>
    </div>
  `;
});
