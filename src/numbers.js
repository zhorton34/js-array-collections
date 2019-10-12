import _ from 'lodash'

class Numberify {
    constructor(number) {

    	this.number = Number.prototype
	
		/**
		 * @param Number 
		 * @return Bool
		 */
		this.number.is = function(number) {
			return (this.valueOf() === number)
		}

		/**
		 * @param Number
		 * @param Number
		 *
		 * @return Bool
		 */
		 this.number.isBetween = function(min, max)
		 {
				return (this.valueOf() < max && this.valueOf() > min)
		 }

		/**
		 * @param Number
		 * @param Number
		 *
		 * @return Bool
		 */
		 this.number.isBetweenOrEquals = function(min, max)
		 {
		 		return (this.valueOf() <= max && this.valueOf() >= min)
		 }

		/**
		 * @param Array
		 * @return Bool
		 */
		this.number.isFirstIn = function(array = []) {
			return (0 === this.valueOf())
		}

		/**
		 * @param Array
		 * @return Bool
		 */
		this.number.isItemOneIn = function(array = []) {
		  return (1 === this.valueOf())
		}

		/**
		 * @param Array
		 * @return Bool
		 */
		this.number.isLengthOf = function(array) {
			return (array.length === this.valueOf())
		}

		/**
		 * @param Array
		 * @return Bool
		 */
		this.number.isNotLastIn = function(array) {
			return ((array.length - 1) !== this.valueOf())
		}

		/**
		 * @param Array
		 * @return Bool
		 */
		this.number.isLastIn = function(array) {
			return ((array.length - 1) === this.valueOf())
		}

		/**
		 * @param Array
		 * @return Bool
		 */
		this.number.matchesAll = function(array) {
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
		this.number.matchesAny = function(array) {
			 return array.includes(this.valueOf())
		}

		return this.number = number
	}
}

exports.Numberfy = function(numerical) {
    return new Numberify(numerical).number
}

