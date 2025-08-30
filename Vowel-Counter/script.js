    document.querySelector('form').addEventListener('submit', function(event) {
            event.preventDefault();
            const text = document.getElementById('inputText').value;
            const vowelCount = (text.match(/[aeiou]/gi) || []).length;
            document.getElementById('result').innerText = `Number of vowels: ${vowelCount}`;
        });