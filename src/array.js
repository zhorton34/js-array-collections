import _ from 'lodash'
import $u from 'underscore'

/**
 *
 * @param property
 * @param context
 * @returns {*}
 */
Array.prototype.orderBy = function(property, context = 'asc')
{
    if(context === 'asc')
    {
        return _.sortBy(this, property)
    }
    else
    {
        return _.sortBy(this, property).reverse()
    }
}

/**
 *
 * @param property
 * @param array
 * @returns {*}
 */
Array.prototype.whereIn = function(property, array)
{
    let subset = []

    this.forEach((element) => {
        if(array.includes(element[property]))
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
Array.prototype.whereNotIn = function(property, array)
{
    let subset = []

    this.forEach((element) => 
    {
        if(!array.includes(element[property]))
            subset.push(element)
    })

    return subset 

}


/**
 *
 * @returns {*[]}
 */
Array.prototype.flatten = function()
{
    
    return this.concat.apply([], this)

}


/**
 *
 * @param property
 * @returns {*}
 */
Array.prototype.flatPluck = function(property)
{
    
    return this.pluck(property).flatten()

}


/**
 *
 * @param property
 * @returns {Array}
 */
Array.prototype.groupBy = function(property)
{
    let set = []
    
    let groups = this.pluck(property).unique()
    
    groups.forEach((group) =>
    {
        set[group] = this.where(property, '=', group)
    })
    
    return set
}


/**
 *
 * @returns {string}
 */
Array.prototype.stringify = function()
{
   
    return JSON.stringify(this)

}


/**
 *
 * @returns {string}
 */
Array.prototype.listify = function()
{
    let list = this.join()
    
    return list.replace(/,/g, ', ')
}


/**
 *
 * @returns {*}
 */
Array.prototype.random = function()
{
    
    return this[Math.floor(Math.random()*this.length)]

}


/**
 *
 * @param $property
 * @param $condition
 * @param $expectation
 * @returns {*}
 */
Array.prototype.findOrFail = function($property, $condition, $expectation)
{
    let subset = this.where($property, $condition, $expectation)
    
    return (subset.length > 0) ? subset : false
}


/**
 *
 * @param callback
 * @returns {Array|Object}
 */
Array.prototype.each = function(callback)
{
    
    return _.forEach(this, callback)

}


/**
 *
 * @returns {Array}
 */
Array.prototype.tail = function()
{
    
    return _.tail(this)

}


/**
 *
 * @param number
 * @returns {*[]}
 */
Array.prototype.take = function(number)
{
    
    return (number > 0) ? this.slice(0, number) : this.reverse().slice(0, number)

}


/**
 *
 * @returns {*}
 */
Array.prototype.first = function()
{
    return this[0]
}

/**
 *
 * @returns {*}
 */
Array.prototype.last = function()
{
    
    return this[this.length - 1]

}


/**
 *
 * @param options
 * @returns {Array}
 */
Array.prototype.where = function(...options)
{
    let $loops = 1
    let $property = options[0]
    let $condition = options[1]

    let conditions = ['=', '!=', '<=', '>=', '<', '>'];

    if($options[2] === undefined || !conditions.includes($condition) || $options[2] === null)
    {
        let $expectation = $condition 
        
        $condition = '='
    }
    else 
    {
        let $expectation = options[2]
    }
    
    while(options[0].constructor === Array)
    {
        $loops = options.length
        
        options = options[0]
    }
    
    let subset = []
    
    for(let i = 0; i < $loops; i++)
    {
        $property = options[0]
        $condition = options[1]
        $expectation = options[2]
        
        this.forEach((prop) =>
        {
            if($condition.includes('!') && $condition.includes('=')) {
                if (prop[$property] !== $expectation)
                    subset.push(prop)
            }
            else if($condition.includes('=') && $condition.includes('>')) {
                if (prop[$property] >= $expectation)
                    subset.push(prop)
            }
            else if($condition.includes('=') && $condition.includes('<')) {
                if (prop[$property] <= $expectation)
                    subset.push(prop)
            }
            else if($condition.includes('=')) {
                if (prop[$property] === $expectation)
                    subset.push(prop)
            }
            else if($condition.includes('<')) {
                if (prop[$property] < $expectation)
                    subset.push(prop)
            }
            else if($condition.includes('>')) {
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
Array.prototype.when = function(element, $condition, $expectation)
{
    this.forEach((value) =>
    {
        if($condition.includes('!') && $condition.includes('=')) {
            if (value !== $expectation)
                subset.push(value)
        }
        else if($condition.includes('=') && $condition.includes('>')) {
            if (value >= $expectation)
                subset.push(value)
        }
        else if($condition.includes('=') && $condition.includes('<')) {
            if (value <= $expectation)
                subset.push(value)
        }
        else if($condition.includes('=')) {
            if (value === $expectation)
                subset.push(value)
        }
        else if($condition.includes('<')) {
            if (value < $expectation)
                subset.push(value)
        }
        else if($condition.includes('>')) {
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
Array.prototype.pluck = function(prop)
{
    
    return $u.pluck(this, prop)

}


/**
 *
 * @returns {Array}
 */
Array.prototype.unique = function()
{
    
    return _.uniq(this)

}


/**
 *
 * @param args
 * @returns {Array}
 */
Array.prototype.append = function(...args)
{
    while(args[0] instanceof Array)
    {
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
Array.prototype.count = function(number = undefined)
{
    if(number !== undefined)
        return (this.length === number)
    
    return this.length
}


/**
 *
 * @param by
 * @returns {Array}
 */
Array.prototype.chunk = function(by)
{
    return _.chunk(this, by)
}


/**
 *
 * @param $property
 * @param $condition
 * @param $expected
 * @returns {*}
 */
Array.prototype.firstWhere = function($property, $condition, $expected)
{
    
    return this.where($property, $condition, $expected).first()
}


/**
 *
 * @param $property
 * @param $condition
 * @param $expected
 * @returns {*}
 */
Array.prototype.lastWhere = function($property, $condition, $expected)
{
    
    return this.where($property, $condition, $expected).last()

}


/**
 *
 * @returns {*|number}
 */
Array.prototype.sum = function()
{
    return this.reduce(function(a, b)
    {
        return a + b
    }, 0)
}


/**
 *
 * @param array
 * @returns {*}
 */
Array.prototype.intersect = function(array)
{
    try
    {
        
        if (array.length > this.length)
            return array.filter((element) => {
            
            })
        else
            return null
    }
    
    catch (error)
    {
        console.log("Error:", error.name, "\nMessage:", error.message)
    }
}


/**
 *
 * @returns {boolean}
 */
Array.prototype.empty = function()
{
    return (this.length === 0)
}


/**
 *
 * @returns {number}
 */
Array.prototype.lastIndex = function()
{
    return (this.length - 1)
}


/**
 *
 * @param args
 * @returns {Array}
 */
Array.prototype.prepend = function(...args)
{
    
    while(args[0] instanceof Array)
    {
        args = args[0]
    }
    
    this.unshift(...args)
    
    return this
}
