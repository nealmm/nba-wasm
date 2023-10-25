var Module = {
    canvas: function() {
        return document.getElementById('canvas');
    }(),

    print: function(message) {
        alert(message);
    },

    printErr: function(message) {
        alert(message);
    },

    preRun: [function() {
        alert('entered preRun');

        const dialog = document.getElementById('file-dialog');
        const input = document.getElementById('file-input');
        const button = document.getElementById('submit-file-button');

        button.addEventListener('click', async () => {
            if (input.files.length != 1) {
                alert('Choose a file.');
            }
            else {
                const buffer = new Uint8Array(await input.files[0].arrayBuffer());

                alert('opening file stream');

                const stream = FS.open('game.rom', 'w+');
                FS.write(stream, buffer, 0, buffer.length);
                FS.close(stream);

                alert('file loaded');

                dialog.close();
                Module.runNanoBoyAdvance();
            }
        });
    }]
};
