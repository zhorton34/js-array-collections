import _ from 'lodash'

/**
 * @param Number
 * @return String
 */
String.prototype.enforceMax = function(limit) 
{
    return this.truncate(limit, false)
}

/**
 * @param Number
 * @return Boolean
 */ 
String.prototype.checkMin = function(limit) 
{
    return (this.length <= limit)
}

/**
 * @param Number
 * @return Boolean
 */ 
String.prototype.checkMax = function(limit) 
{
    return (this.length => limit)
}  

/**
 * @return Boolean
 *
 * Valid Formats: 
 *   (123) 456-7890
 *   (123)456-7890
 *   123-456-7890
 *   123.456.7890
 *   1234567890
 *   +31636363634
 *   075-63546725
 */
String.prototype.isPhoneNumber = function()
{
    let expression = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im

    return expression.test(this)
}

/**
 * @return Boolean
 */
String.prototype.isUrl = function()
{
    let expression = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
    
    return expression.test(this);
}

/**
 * @return Boolean
 */
String.prototype.isEmail = function()
{
    expression = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
    return expression.test(this);
}

/**
 * @return String
 */
String.prototype.toSnakeCase = function()
{
    if(this.length === 0) return this
    
    return this
        .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
        .map(x => x.toLowerCase())
        .join('_')
}


/**
 * @return String
 */
String.prototype.toTextCase = function() 
{
    return this
}

/**
 * @return String
 */
String.prototype.toCamelCase = function()
{
    if(this.length === 0) return this
    
    return this.toSnakeCase()
                .replace(/(\-\w)/g, function(m) 
                {
                    return m[1].toUpperCase();
                });
}

/** 
 * @return String
 */
String.prototype.replaceUnderscoresForSpaces = function ()
{

    return this.underscoreSpaces()
}

/**
 * @return String
 */
String.prototype.underscoreSpaces = function()
{
    if(this.length === 0) return this
    
    return this.replace(/\s/g, '_')
}

/**
 * @return String
 */
String.prototype.capitalize = function()
{
    
    return this.charAt(0).toUpperCase() + this.slice(1)

}

/**
 * @param String
 *
 * @return Boolean
 */
String.prototype.matches = function(string)
{
    let current = this.slice(0, this.length)
    
    return (current === string)
}

/**
 * @param Number
 * @param Boolean
 *
 * @return String
 */
String.prototype.truncate = function(limit, dots = true)
{
    let truncated = this.substring(0, limit) 

    truncated = (dots) ? truncated + '...' : truncated

    return (this.length > limit) ? truncated : this.slice(0, this.length)
}

/**
 * @return String
 */
String.prototype.empty = function()
{
    switch (this)
    {
        case "":
        case " ":
        case this.length < 1:
            return true;
        default:
            return false;
    }
}

/**
 *
 * @returns {string}
 */
String.prototype.trim_right  = function()
{
    
    return this.replace(/\s+$/g, '');

}

/**
 *
 * @returns {string}
 */
String.prototype.trimRight  = function()
{
    
    return this.replace(/\s+$/g, '');

}

/**
 *
 * @param character
 * @returns {string}
 */
String.prototype.remove_character = function(character)
{
    
    return this.replace(character, "")

}

/**
 *
 * @param character
 * @returns {string}
 */
String.prototype.removeCharacter = function(character)
{
    
    return this.replace(character, "")

}

/**
 *
 * @return String
 */
String.prototype.trim_left = function()
{
    
    return this.replace(/^\s+|\s+$/g, '');

}

/**
 *
 * @return String
 */
String.prototype.trimLeft = function()
{
    
    return this.replace(/^\s+|\s+$/g, '');

}

/**
 *
 * @return String
 */
String.prototype.trim_both = function()
{
   
    return this.trim_right().trim_left()

}

/**
 *
 * @return String
 */
String.prototype.trimBoth = function()
{
   
    return this.trim_right().trim_left()

}