function match(pattern, str) {
	if (!pattern) return true
	else if (!str) return false

	let nextList = generateNextList(pattern)
	let j = 0

	for (let i = 0; i < str.length; i++) {
		if (str[i] === pattern[j]) {
			j++
		} else {
			while(j > 0) {
				j = nextList[j - 1]
				if (str[i] === pattern[j]) {
					j++
					break
				}
			}
		}

		if (j === pattern.length) return true
		else if (str.length - 1 - i < pattern.length - j) return false
	}

	return false
}

function generateNextList(pattern) {
	let array = [0]
	let j = 0
	let isEqual = false

	for (let i = 1; i < pattern.length; i++) {
		if (pattern[i] === pattern[j]) {
			j++
		} else {
			while(j > 0) {
				j = array[j - 1]
				if (pattern[i] === pattern[j]) {
					isEqual = true
					break
				}
			}

			if (isEqual) {
				j++
				isEqual = false
			}
		}

		array.push(j)
	}

	return array
}

let res = generateNextList('ababaaababaa')
