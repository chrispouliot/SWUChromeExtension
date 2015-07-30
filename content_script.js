walk(document.body);

function walk(node) {
	// This function Modified from http://bit.ly/1o47KcH
	var child, next;

	switch ( node.nodeType ) {
		case 1:  // Element
		case 9:  // Document
		case 11: // Document fragment
			child = node.firstChild;
			while ( child ) {
				next = child.nextSibling;
				walk(child);
				child = next;
			}
			break;

		case 3: // Text node
			handleText(node);
			break;
	}
}

function whereToAddSw(word) {
	// Return index to add 'sw' to if a 'u' is 1st or 2nd letter
	if (word.charAt(0) === 'u' || word.charAt(0) === 'U') {
		return 0;
	} else if (word.charAt(1) === 'u' || word.charAt(1) === 'U') {
		return 1;
	}
	return -1;
}

function readySw(word) {
	// URL -> SWURL
	if (word === word.toUpperCase() || word.substring(0, 3) === word.substring(0, 3).toUpperCase()) {
		return 'SW'+word;
	} else if (word.charAt(0) === word.charAt(0).toUpperCase()) {
			// Update -> Swupdate
			if (word.charAt(0) === 'U') {
				return 'Swu'+word.substring(1);
			}
		// Customer -> Swustomer
		return 'Sw'+word.substring(1);
	// customer -> swustomer
	} else if (word.charAt(0) !== 'u') {
		return 'sw'+word.substring(1);
	}
	// update -> swupdate
	return 'sw'+word;			
}


function handleText(textNode) {
	var text = textNode.nodeValue;
	var words = text.split(" ");

	// Loop through all words. If word has 1st or2nd letter as 'u', swu-i-fy it
	for (var wordIndex = 0; wordIndex < words.length; wordIndex++) {
		// 'swur' looks weird
		if (words[wordIndex].toUpperCase() === 'our'.toUpperCase()) {
			continue;
		}
		// If first letter is a 'u', add 'sw'
		if (whereToAddSw(words[wordIndex]) == 0) {
			var addSw = readySw(words[wordIndex]);
			text = text.replace(words[wordIndex], addSw);

		// If second letter is a 'u', remove first letter with 'sw'
		} else if (whereToAddSw(words[wordIndex]) == 1) {
			var addSw = readySw(words[wordIndex]);
			text = text.replace(words[wordIndex], addSw);
		}
	}
	
	textNode.nodeValue = text;
}