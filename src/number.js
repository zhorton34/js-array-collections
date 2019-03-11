
/**
 * @param Number 
 * @return Bool
 */
Number.prototype.is = function(number) {
	return (this.valueOf() === number)
}

/**
 * @param Number
 * @param Number
 *
 * @return Bool
 */
 Number.prototype.isBetween = function(min, max)
 {
		return (this.valueOf() < max && this.valueOf() > min)
 }

/**
 * @param Number
 * @param Number
 *
 * @return Bool
 */
 Number.prototype.isBetweenOrEquals = function(min, max)
 {
 		return (this.valueOf() <= max && this.valueOf() >= min)
 }

/**
 * @param Array
 * @return Bool
 */
Number.prototype.isFirstIn = function(array = []) {
	return (0 === this.valueOf())
}

/**
 * @param Array
 * @return Bool
 */
Number.prototype.isItemOneIn = function(array = []) {
  return (1 === this.valueOf())
}

/**
 * @param Array
 * @return Bool
 */
Number.prototype.isLastIn = function(array) {
	return ((array.length - 1) === this.valueOf())
}

/**
 * @param Array
 * @return Bool
 */
Number.prototype.matchesAll = function(array) {
		let matches = true 

		array.forEach((num) => 
		{
			if(!matches) return 

			matches = (this.valueOf() === num)	
		})

		return matches 
}

/**
 * @param Array
 * @return Bool
 */
Number.prototype.matchesAny = function(array) {
	 return array.includes(this.valueOf())
}
