compress:
	rm compressed*.js
	java -jar ../compiler.jar --js_output_file=compressedScripts.js script.js animate.js

