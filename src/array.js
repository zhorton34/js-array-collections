import _ from 'lodash'
import $u from 'underscore'

window.Array.prototype.orderBy = function(property, context = 'asc')
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

window.Array.prototype.flatten = function()
{
    return this.concat.apply([], this)
}

window.Array.prototype.flatPluck = function(property)
{
    return this.pluck(property).flatten()
}
window.Array.prototype.groupBy = function(property)
{
    let set = []
    
    let groups = this.pluck(property).unique()
    
    groups.forEach((group) =>
    {
        set[group] = this.where(property, '=', group)
    })
    
    return set
}

window.Array.prototype.stringify = function()
{
    return JSON.stringify(this)
}

window.Array.prototype.listify = function()
{
    let list = this.join()
    
    return list.replace(/,/g, ', ')
}
window.Array.prototype.random = function()
{
    return this[Math.floor(Math.random()*this.length)]
}

window.Array.prototype.orderBy = function(array)
{
    return _.sortBy(this, array)
}
window.Array.prototype.findOrFail = function($property, $condition, $expectation)
{
    let subset = this.where($property, $condition, $expectation)
    
    return (subset.length > 0) ? subset : false
}

window.Array.prototype.each = function(callback)
{
    return _.forEach(this, callback)
}


window.Array.prototype.tail = function()
{
    return _.tail(this)
}

window.Array.prototype.take = function(number)
{
    return (number > 0) ? this.slice(0, number) : this.reverse().slice(0, number)
}

window.Array.prototype.first = function()
{
    return this[0]
}

window.Array.prototype.last = function()
{
    return this[this.length - 1]
}


window.Array.prototype.where = function(...options)
{
    let $loops = 1
    let $property = options[0]
    let $condition = options[1]
    let $expectation = options[2]
    
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

window.Array.prototype.when = function(element, $condition, $expectation)
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

window.Array.prototype.pluck = function(prop)
{
    return $u.pluck(this, prop)
}

window.Array.prototype.unique = function()
{
    return _.uniq(this)
}


window.Array.prototype.append = function(...args)
{
    while(args[0] instanceof Array)
    {
        args = args[0]
    }
    
    this.push(...args)
    
    return this
}

window.Array.prototype.count = function(number = undefined)
{
    if(number !== undefined)
        return (this.length === number)
    
    return this.length
}

window.Array.prototype.chunk = function(by)
{
    return _.chunk(this, by)
}

window.Array.prototype.firstWhere = function($property, $condition, $expected)
{
    
    return this.where($property, $condition, $expected).first()
}

window.Array.prototype.lastWhere = function($property, $condition, $expected)
{
    return this.where($property, $condition, $expected).last()
}

window.Array.prototype.sum = function()
{
    return this.reduce(function(a, b)
    {
        return a + b
    }, 0)
}

window.Array.prototype.intersect = function(array)
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

window.Array.prototype.empty = function()
{
    return (this.length === 0)
}

window.Array.prototype.lastIndex = function()
{
    return (this.length - 1)
}

window.Array.prototype.prepend = function(...args)
{
    
    while(args[0] instanceof Array)
    {
        args = args[0]
    }
    
    this.unshift(...args)
    
    return this
}
