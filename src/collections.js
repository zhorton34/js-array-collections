import _ from 'lodash'

/*
 * Istansiate Array Collections
 */
const Collection = function() { };

/*
 * Set Array Collections To Mimic Arrays
 */
Collection.prototype = new Array;

/* --------------------------------------------
/* Add extra functionality for Collections 
/* --------------------------------------------


/**
 *
 * @param property
 * @param context
 * @returns {*}
 */
Collection.orderBy = function(property, context = 'asc')
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
 *  @param String
 *  @return {*}
 */
Collection.orderBy = function(string) {
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
Collection.orderBy = function(string) {

    return this.map((item, index) => this.nested(`${index}.${string}`))

}


/**
 * @param {*}
 * @return Bool
 */

Collection.orderBy = function(property)
{
    return (this.includes(property) === false)
}

/**
 * @return Boolean
 */ 
Collection.orderBy = function() 
{
    return (this.length === this.unique.length)
}

/**
 * @param Number
 * @return Boolean
 */
Collection.orderBy = function(limit) 
{
    return (this.length <= limit)
}

/**
 *
 * @param property
 * @param callback
 * @returns {*}
 */
Collection.orderBy = function(property, callback)
{
    return this.map((item) => (callback(item[property]) ? item : null))
               .removeNull()
}

/**
 * @return Array
 */
Collection.orderBy = function()
{
    return this.filter((item) => (item !== undefined))
}

/**
 * @return Array
 */
Collection.orderBy = function()
{
    return this.filter((item) => (item !== null))
}

/**
 *
 * @param property
 * @param substring or item in array
 * @returns {*}
 */
Collection.orderBy = function(property, has)
{
    return this.whereHas(property, (item) => item.includes(has))
}
           

/**
 *
 * @param property
 * @param context
 * @returns {*}
 */
Collection.orderBy= function(property, context = 'asc')
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
Collection.orderBy = function(property, array)
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
Collection.orderBy = function(property, array)
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
Collection.orderBy = function()
{
    
    return this.concat.apply([], this)

}


/**
 *
 * @param property
 * @returns {*}
 */
Collection.orderBy = function(property)
{
    
    return this.pluck(property).flatten()

}


/**
 *
 * @param property
 * @returns {Array}
 */
Collection.orderBy = function(property)
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
Collection.orderBy = function()
{
   
    return JSON.stringify(this)

}


/**
 *
 * @returns {string}
 */
Collection.orderBy = function()
{
    let list = this.join()
    
    return list.replace(/,/g, ', ')
}


/**
 *
 * @returns {*}
 */
Collection.orderBy = function()
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
Collection.orderBy= function($property, $condition, $expectation)
{
    let subset = this.where($property, $condition, $expectation)
    
    return (subset.length > 0) ? subset : false
}


/**
 *
 * @param callback
 * @returns {Array|Object}
 */
Collection.orderBy = function(callback)
{
    
    return _.forEach(this, callback)

}


/**
 *
 * @returns {Array}
 */
Collection.orderBy = function()
{
    
    return _.tail(this)

}


/**
 *
 * @param number
 * @returns {*[]}
 */
Collection.orderBy = function(number)
{
    
    return (number > 0) ? this.slice(0, number) : this.reverse().slice(0, number)

}


/**
 *
 * @returns {*}
 */
Collection.orderBy = function()
{
    return this[0]
}

/**
 *
 * @returns {*}
 */
Collection.orderBy = function()
{
    
    return this[this.length - 1]

}


/**
 *
 * @param options
 * @returns {Array}
 */
Collection.orderBy = function(...options)
{
    let $loops = 1
    let $property = options[0]
    let $condition = options[1]
    let $expectation = options[2]
    let subset = []
    let conditions = ['=', '!=', '<=', '>=', '<', '>', '!'];

    if(options[0].constructor !== Array)
    {

        if(options[2] === "undefined" || !conditions.includes($condition) || options[2] === "null") {
            $expectation = $condition 
        
            $condition = '='
            $property = options[0]
        }
        else {
            $property = options[0]
            $condition = options[1]
            $expectation = options[2]
        }

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

        return subset
    }
    else
    {
        while(options[0].constructor === Array)
        {
            $loops = options.length
        
            options = options[0]
        }
    }
        
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
Collection.orderBy = function(element, $condition, $expectation)
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
$Collection.orderBy = function(prop)
{
    return this.reduce((carry, item) => [
      ...carry, item[prop]
    ], [])
}


/**
 *
 * @returns {Array}
 */
Collection.orderBy = function()
{
    
    return _.uniq(this)

}


/**
 *
 * @param args
 * @returns {Array}
 */
Collection.orderBy = function(...args)
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
Collection.orderBy = function(number = undefined)
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
Collection.orderBy = function(by)
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
Collection.orderBy = function($property, $condition, $expected)
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
Collection.orderBy = function($property, $condition, $expected)
{
    
    return this.where($property, $condition, $expected).last()

}


/**
 *
 * @returns {*|number}
 */
Collection.orderBy = function()
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
Collection.orderBy = function(array)
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
Collection.orderBy = function()
{
    return (this.length === 0)
}


/**
 *
 * @returns {number}
 */
Collection.orderBy = function()
{
    return (this.length - 1)
}


/**
 *
 * @param args
 * @returns {Array}
 */
Collection.orderBy = function(...args)
{
    
    while(args[0] instanceof Array)
    {
        args = args[0]
    }
    
    this.unshift(...args)        
}

export { Collection };
export default { Collection };