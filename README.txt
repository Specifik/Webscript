Bitte diesen Schritten folgen, damit die Ausführung der Website funktioniert:

----------------------------

1. Öffnen Sie Visual Studio Code und installieren Sie die Erweiterung "PHP Server".

2. Klicken Sie auf das Zahnrad-Symbol unten links, um zu den Einstellungen zu gelangen und wählen Sie "Optionen".

3. In der Erweiterungsleiste auf der linken Seite suchen Sie nach "PHP Server configuration" oder geben Sie es oben in der Suchleiste ein.

4.Geben Sie den Pfad zur "php.exe"-Datei Ihres XAMPP-Verzeichnisses ein (zum Beispiel: C:\xampp\php\php.exe) in das Feld "Phpserver: PHP Path" ein.

5.Geben Sie den Pfad zur "php.ini"-Datei Ihres XAMPP-Verzeichnisses ein (zum Beispiel: C:\xampp\php\php.ini) in das Feld "Phpserver: PHP Config Path" ein.

6.Suchen Sie oben in der Suchleiste nach "PHP validate: Executable Path" und klicken Sie auf "Edit in settings.json".

7.Tragen Sie den Pfad zur "php.exe"-Datei, den Sie zuvor eingegeben haben, in die Zeilen "phpserver.phpPath" und "php.validate.executablePath" ein.
Tragen Sie auch den Pfad zur "php.ini"-Datei in die Zeile "phpserver.phpConfigPath" ein.

Beispiel zur Veranschaulichung:

    ...
    "phpserver.phpPath": "C:\\xampp\\php\\php.exe",
    "phpserver.phpConfigPath": "C:\\xampp\\php\\php.ini",
    "php.validate.executablePath": "C:\\xampp\\php\\php.exe",
    ...

8. Öffnen Sie nun Ihre "index.html"-Datei, klicken Sie mit der rechten Maustaste auf den Bildschirm und wählen Sie "PHP Server: Serve Project" aus.

----------------------------

Viel Spaß!