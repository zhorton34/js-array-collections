import _ from 'lodash'

class ArrayCollection {
    constructor(collection) {
        if (!Array.isArray(collection)) {
            window.console.error('Collection is not instanciated from an array: ', collection)
        }

        this.collection = Array.prototype
        /**
         *
         * @param property
         * @param context
         * @returns {*}
         */
        this.collection.orderBy = function (property, context = 'asc') {
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
        this.collection.nested = function (string) {
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
        this.collection.nestedPluck = function (string) {

            return this.map((item, index) => this.nested(`${index}.${string}`))

        }


        /**
         * @param {*}
         * @return Bool
         */

        this.collection.doesNotIncludeProperty = function (property) {
            return this.reduce((carry, item) => [...Object.keys(item)], []).includes(property) === false
        }

        /**
         * @return Boolean
         */
        this.collection.onlyHasUnique = function () {
            return (this.length === this.unique.length)
        }

        /**
         * @param Number
         * @return Boolean
         */
        this.collection.checkMin = function (limit) {
            return (this.length <= limit)
        }

        /**
         *
         * @param property
         * @param callback
         * @returns {*}
         */
        this.collection.whereHas = function (property, callback) {
            return this.map((item) => (callback(item[property]) ? item : null))
                .removeNull()
        }


        /**
         *
         * @param property
         * @param callback
         * @returns {*}
         */
        this.collection.mapWhereHas = function (conditionalCallback, mapperCallback) {
            return this.map(item => conditionalCallback(item) ? mapperCallback(item) : ({
                ...item 
            })).removeNull()
        }

        /*
         * update/map items where conditions are met
         */
        this.collection.updateWhere = function (...options) {
            let updateCallback = options[options.length - 1]
            let whereConditions = options.slice(0, options.length - 1)

            
            let subset = [...this]
            subset = whereConditions.length === 2 
                ? subset.where(whereConditions[0], whereConditions[1])
                : subset.where(whereConditions[0], whereConditions[1], whereConditions[2])


            return this.reduce((carry, item) => [
                ...carry,
                subset.contains(item) ? updateCallback(item) : item
            ], [])
        }


        /**
         * @return Boolean
         * Determine if the item already exists in our collection
         */
        this.collection.contains = function(item) {
            return this.reduce((foundMatch, compareAgainst) => foundMatch ? true : _.isEqual(item, compareAgainst), false)
        }

        /**
         * @return Array
         */
        this.collection.removeUndefined = function () {
            return this.filter((item) => (item !== undefined))
        }

        /**
         * @return Array
         */
        this.collection.removeNull = function () {
            return this.filter((item) => (item !== null))
        }

        /**
         *
         * @param property
         * @param substring or item in array
         * @returns {*}
         */
        this.collection.wherePropertyHas = function (property, has) {
            return this.whereHas(property, (item) => item.includes(has))
        }


        /**
         *
         * @param property
         * @param context
         * @returns {*}
         */
        this.collection.orderBy = function (property, context = 'asc') {
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
        this.collection.whereIn = function (property, array) {
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
        this.collection.whereNotIn = function (property, array) {
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
        this.collection.flatten = function () {

            return this.concat.apply([], this)

        }


        /**
         *
         * @param property
         * @returns {*}
         */
        this.collection.flatPluck = function (property) {

            return this.pluck(property).flatten()

        }


        /**
         *
         * @param property
         * @returns {Array}
         */
        this.collection.groupBy = function (property) {
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
        this.collection.stringify = function () {

            return JSON.stringify(this)

        }


        /**
         *
         * @returns {string}
         */
        this.collection.listify = function () {
            let list = this.join()

            return list.replace(/,/g, ', ')
        }


        /**
         *
         * @returns {*}
         */
        this.collection.random = function () {

            return this[Math.floor(Math.random() * this.length)]

        }

        /**
         *
         * @param $property
         * @param $condition
         * @param $expectation
         * @returns {*}
         */
        this.collection.findOrFail = function ($property, $condition, $expectation) {
            let subset = this.where($property, $condition, $expectation)

            return (subset.length > 0) ? subset : false
        }


        /**
         *
         * @param callback
         * @returns {Array|Object}
         */
        this.collection.each = function (callback) {

            return _.forEach(this, callback)

        }


        /**
         *
         * @returns {Array}
         */
        this.collection.tail = function () {

            return _.tail(this)

        }


        /**
         *
         * @param number
         * @returns {*[]}
         */
        this.collection.take = function (number) {

            return (number > 0) ? this.slice(0, number) : this.reverse().slice(0, number)

        }


        /**
         *
         * @returns {*}
         */
        this.collection.first = function () {
            return this[0]
        }

        /**
         *
         * @returns {*}
         */
        this.collection.last = function () {

            return this[this.length - 1]

        }


        /**
         *
         * @param options
         * @returns {Array}
         */
        this.collection.where = function (...options) {
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
        this.collection.when = function (element, $condition, $expectation) {
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
        this.collection.pluck = function (prop) {

            return this.reduce((items, item) => [...items, item[prop]], [])

        }


        /**
         *
         * @returns {Array}
         */
        this.collection.unique = function () {

            return _.uniq(this)

        }


        /**
         *
         * @param args
         * @returns {Array}
         */
        this.collection.append = function (...args) {
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
        this.collection.count = function (number = undefined) {
            if (number !== undefined)
                return (this.length === number)

            return this.length
        }


        /**
         *
         * @param by
         * @returns {Array}
         */
        this.collection.chunk = function (by) {
            return _.chunk(this, by)
        }


        /**
         *
         * @param $property
         * @param $condition
         * @param $expected
         * @returns {*}
         */
        this.collection.firstWhere = function ($property, $condition, $expected) {

            return this.where($property, $condition, $expected).first()
        }


        /**
         *
         * @param $property
         * @param $condition
         * @param $expected
         * @returns {*}
         */
        this.collection.lastWhere = function ($property, $condition, $expected) {

            return this.where($property, $condition, $expected).last()

        }

        /**
         *
         * @returns {*|number}
         */
        this.collection.sum = function () {
            return this.reduce(function (a, b) {
                return a + b
            }, 0)
        }


        /**
         *
         * @param array
         * @returns {*}
         */
        this.collection.intersect = function (array) {
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
        this.collection.empty = function () {
            return (this.length === 0)
        }


        /**
         *
         * @returns {number}
         */
        this.collection.lastIndex = function () {
            return (this.length - 1)
        }


        /**
         *
         * @param args
         * @returns {Array}
         */
        this.collection.prepend = function (...args) {

            while (args[0] instanceof Array) {
                args = args[0]
            }

            this.unshift(...args)
        }

        return this.collection = collection
    }
}

exports.Collect = function(array) {
    return new ArrayCollection(array)
}

