import _ from 'lodash'

class ArrayCollection {
    constructor(items) {
        if (!Array.isArray(items)) {
            window.console.error('Collection is not instanciated from an array: ', items)
        }

        this.items = Array.prototype
        /**
         *
         * @param property
         * @param context
         * @returns {*}
         */
        this.items.orderBy = function (property, context = 'asc') {
            if (context === 'asc') {
                return _.sortBy(this, property)
            } else {
                return _.sortBy(this, property).reverse()
            }
        }

        /**
         *  @param String
         *  @return {*}
         */
        this.items.nested = function (string) {
            let object = this
            string = string.replace(/\[(\w+)\]/g, '.$1')
            string = string.replace(/^\./, '')
            let split = string.split('.')

            for (let iteration = 0, limit = split.length; iteration < limit; ++iteration) {
                let key = split[iteration];
                if (key in object) {
                    object = object[key];
                } else {
                    return;
                }
            }
            return object;
        }

        /**
         * @param String
         * @return Array
         */
        this.items.nestedPluck = function (string) {

            return this.map((item, index) => this.nested(`${index}.${string}`))

        }


        /**
         * @param {*}
         * @return Bool
         */

        this.items.doesNotInclude = function (property) {
            return (this.includes(property) === false)
        }

        /**
         * @return Boolean
         */
        this.items.onlyHasUnique = function () {
            return (this.length === this.unique.length)
        }

        /**
         * @param Number
         * @return Boolean
         */
        this.items.checkMin = function (limit) {
            return (this.length <= limit)
        }

        /**
         *
         * @param property
         * @param callback
         * @returns {*}
         */
        this.items.whereHas = function (property, callback) {
            return this.map((item) => (callback(item[property]) ? item : null))
                .removeNull()
        }

        /**
         * @return Array
         */
        this.items.removeUndefined = function () {
            return this.filter((item) => (item !== undefined))
        }

        /**
         * @return Array
         */
        this.items.removeNull = function () {
            return this.filter((item) => (item !== null))
        }

        /**
         *
         * @param property
         * @param substring or item in array
         * @returns {*}
         */
        this.items.wherePropertyHas = function (property, has) {
            return this.whereHas(property, (item) => item.includes(has))
        }


        /**
         *
         * @param property
         * @param context
         * @returns {*}
         */
        this.items.orderBy = function (property, context = 'asc') {
            if (context === 'asc') {
                return _.sortBy(this, property)
            } else {
                return _.sortBy(this, property).reverse()
            }
        }

        /**
         *
         * @param property
         * @param array
         * @returns {*}
         */
        this.items.whereIn = function (property, array) {
            let subset = []

            this.forEach((element) => {
                if (array.includes(element[property]))
                    subset.push(element)
            })

            return subset
        }


        /**
         *
         * @param property
         * @param array
         * @returns {*}
         */
        this.items.whereNotIn = function (property, array) {
            let subset = []

            this.forEach((element) => {
                if (!array.includes(element[property]))
                    subset.push(element)
            })

            return subset

        }


        /**
         *
         * @returns {*[]}
         */
        this.items.flatten = function () {

            return this.concat.apply([], this)

        }


        /**
         *
         * @param property
         * @returns {*}
         */
        this.items.flatPluck = function (property) {

            return this.pluck(property).flatten()

        }


        /**
         *
         * @param property
         * @returns {Array}
         */
        this.items.groupBy = function (property) {
            let set = []

            let groups = this.pluck(property).unique()

            groups.forEach((group) => {
                set[group] = this.where(property, '=', group)
            })

            return set
        }


        /**
         *
         * @returns {string}
         */
        this.items.stringify = function () {

            return JSON.stringify(this)

        }


        /**
         *
         * @returns {string}
         */
        this.items.listify = function () {
            let list = this.join()

            return list.replace(/,/g, ', ')
        }


        /**
         *
         * @returns {*}
         */
        this.items.random = function () {

            return this[Math.floor(Math.random() * this.length)]

        }

        /**
         *
         * @param $property
         * @param $condition
         * @param $expectation
         * @returns {*}
         */
        this.items.findOrFail = function ($property, $condition, $expectation) {
            let subset = this.where($property, $condition, $expectation)

            return (subset.length > 0) ? subset : false
        }


        /**
         *
         * @param callback
         * @returns {Array|Object}
         */
        this.items.each = function (callback) {

            return _.forEach(this, callback)

        }


        /**
         *
         * @returns {Array}
         */
        this.items.tail = function () {

            return _.tail(this)

        }


        /**
         *
         * @param number
         * @returns {*[]}
         */
        this.items.take = function (number) {

            return (number > 0) ? this.slice(0, number) : this.reverse().slice(0, number)

        }


        /**
         *
         * @returns {*}
         */
        this.items.first = function () {
            return this[0]
        }

        /**
         *
         * @returns {*}
         */
        this.items.last = function () {

            return this[this.length - 1]

        }


        /**
         *
         * @param options
         * @returns {Array}
         */
        this.items.where = function (...options) {
            let $loops = 1
            let $property = options[0]
            let $condition = options[1]
            let $expectation = options[2]
            let subset = []
            let conditions = ['=', '!=', '<=', '>=', '<', '>', '!'];

            if (options[0].constructor !== Array) {

                if (options[2] === "undefined" || !conditions.includes($condition) || options[2] === "null") {
                    $expectation = $condition

                    $condition = '='
                    $property = options[0]
                } else {
                    $property = options[0]
                    $condition = options[1]
                    $expectation = options[2]
                }

                this.forEach((prop) => {
                    if ($condition.includes('!') && $condition.includes('=')) {
                        if (prop[$property] !== $expectation)
                            subset.push(prop)
                    } else if ($condition.includes('=') && $condition.includes('>')) {
                        if (prop[$property] >= $expectation)
                            subset.push(prop)
                    } else if ($condition.includes('=') && $condition.includes('<')) {
                        if (prop[$property] <= $expectation)
                            subset.push(prop)
                    } else if ($condition.includes('=')) {
                        if (prop[$property] === $expectation)
                            subset.push(prop)
                    } else if ($condition.includes('<')) {
                        if (prop[$property] < $expectation)
                            subset.push(prop)
                    } else if ($condition.includes('>')) {
                        if (prop[$property] > $expectation)
                            subset.push(prop)
                    }
                })

                return subset
            } else {
                while (options[0].constructor === Array) {
                    $loops = options.length

                    options = options[0]
                }
            }

            for (let i = 0; i < $loops; i++) {
                $property = options[0]
                $condition = options[1]
                $expectation = options[2]

                this.forEach((prop) => {
                    if ($condition.includes('!') && $condition.includes('=')) {
                        if (prop[$property] !== $expectation)
                            subset.push(prop)
                    } else if ($condition.includes('=') && $condition.includes('>')) {
                        if (prop[$property] >= $expectation)
                            subset.push(prop)
                    } else if ($condition.includes('=') && $condition.includes('<')) {
                        if (prop[$property] <= $expectation)
                            subset.push(prop)
                    } else if ($condition.includes('=')) {
                        if (prop[$property] === $expectation)
                            subset.push(prop)
                    } else if ($condition.includes('<')) {
                        if (prop[$property] < $expectation)
                            subset.push(prop)
                    } else if ($condition.includes('>')) {
                        if (prop[$property] > $expectation)
                            subset.push(prop)
                    }
                })
            }

            return subset
        }


        /**
         *
         * @param element
         * @param $condition
         * @param $expectation
         * @returns {*}
         */
        this.items.when = function (element, $condition, $expectation) {
            this.forEach((value) => {
                if ($condition.includes('!') && $condition.includes('=')) {
                    if (value !== $expectation)
                        subset.push(value)
                } else if ($condition.includes('=') && $condition.includes('>')) {
                    if (value >= $expectation)
                        subset.push(value)
                } else if ($condition.includes('=') && $condition.includes('<')) {
                    if (value <= $expectation)
                        subset.push(value)
                } else if ($condition.includes('=')) {
                    if (value === $expectation)
                        subset.push(value)
                } else if ($condition.includes('<')) {
                    if (value < $expectation)
                        subset.push(value)
                } else if ($condition.includes('>')) {
                    if (value > $expectation)
                        subset.push(value)
                }
            })

            return subset
        }


        /**
         *
         * @param prop
         * @returns {*}
         */
        this.items.pluck = function (prop) {

            return this.reduce((items, item) => [...items, item[prop]], [])

        }


        /**
         *
         * @returns {Array}
         */
        this.items.unique = function () {

            return _.uniq(this)

        }


        /**
         *
         * @param args
         * @returns {Array}
         */
        this.items.append = function (...args) {
            while (args[0] instanceof Array) {
                args = args[0]
            }

            this.push(...args)

            return this
        }


        /**
         *
         * @param number
         * @returns {*}
         */
        this.items.count = function (number = undefined) {
            if (number !== undefined)
                return (this.length === number)

            return this.length
        }


        /**
         *
         * @param by
         * @returns {Array}
         */
        this.items.chunk = function (by) {
            return _.chunk(this, by)
        }


        /**
         *
         * @param $property
         * @param $condition
         * @param $expected
         * @returns {*}
         */
        this.items.firstWhere = function ($property, $condition, $expected) {

            return this.where($property, $condition, $expected).first()
        }


        /**
         *
         * @param $property
         * @param $condition
         * @param $expected
         * @returns {*}
         */
        this.items.lastWhere = function ($property, $condition, $expected) {

            return this.where($property, $condition, $expected).last()

        }

        /**
         *
         * @returns {*|number}
         */
        this.items.sum = function () {
            return this.reduce(function (a, b) {
                return a + b
            }, 0)
        }


        /**
         *
         * @param array
         * @returns {*}
         */
        this.items.intersect = function (array) {
            try {

                if (array.length > this.length)
                    return array.filter((element) => {

                    })
                else
                    return null
            } catch (error) {
                console.log("Error:", error.name, "\nMessage:", error.message)
            }
        }


        /**
         *
         * @returns {boolean}
         */
        this.items.empty = function () {
            return (this.length === 0)
        }


        /**
         *
         * @returns {number}
         */
        this.items.lastIndex = function () {
            return (this.length - 1)
        }


        /**
         *
         * @param args
         * @returns {Array}
         */
        this.items.prepend = function (...args) {

            while (args[0] instanceof Array) {
                args = args[0]
            }

            this.unshift(...args)
        }

        return this.items = items
    }
}

module.exports = function(array) {
    return new ArrayCollection(array)
}
