const Numberfy = function(number) {

	$this = number
	
	/**
	 * @param Number 
	 * @return Bool
	 */
	$this.is = function(number) {
		return ($this.valueOf() === number)
	}

	/**
	 * @param Number
	 * @param Number
	 *
	 * @return Bool
	 */
	 $this.isBetween = function(min, max)
	 {
			return ($this.valueOf() < max && $this.valueOf() > min)
	 }

	/**
	 * @param Number
	 * @param Number
	 *
	 * @return Bool
	 */
	 $this.isBetweenOrEquals = function(min, max)
	 {
	 		return ($this.valueOf() <= max && $this.valueOf() >= min)
	 }

	/**
	 * @param Array
	 * @return Bool
	 */
	$this.isFirstIn = function(array = []) {
		return (0 === $this.valueOf())
	}

	/**
	 * @param Array
	 * @return Bool
	 */
	$this.isItemOneIn = function(array = []) {
	  return (1 === $this.valueOf())
	}

	/**
	 * @param Array
	 * @return Bool
	 */
	$this.isLengthOf = function(array) {
		return (array.length === $this.valueOf())
	}

	/**
	 * @param Array
	 * @return Bool
	 */
	$this.isNotLastIn = function(array) {
		return ((array.length - 1) !== $this.valueOf())
	}

	/**
	 * @param Array
	 * @return Bool
	 */
	$this.isLastIn = function(array) {
		return ((array.length - 1) === $this.valueOf())
	}

	/**
	 * @param Array
	 * @return Bool
	 */
	$this.matchesAll = function(array) {
			let matches = true 

			array.forEach((num) => 
			{
				if(!matches) return 

				matches = ($this.valueOf() === num)	
			})

			return matches 
	}

	/**
	 * @param Array
	 * @return Bool
	 */
	$this.matchesAny = function(array) {
		 return array.includes($this.valueOf())
	}

	return $this
}

export { Numberfy };
export default { Numberfy };