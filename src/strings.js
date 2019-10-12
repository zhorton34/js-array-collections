import _ from 'lodash'

class Stringify {
    constructor(string) {
    
        this.string = String.prototype

        /**
         * @return Boolean
         */
        this.string.isDate = function()
        {
            let expression = /(^\d{1,4}[\.|\\/|-]\d{1,2}[\.|\\/|-]\d{1,4})(\s*(?:0?[1-9]:[0-5]|1(?=[012])\d:[0-5])\d\s*[ap]m)?$/;

            if (toString.call(this) === '[object Date]') 
                return true;

            if (typeof this.replace === 'function') 
                this.replace(/^\s+|\s+$/gm, '');
            
            return expression.test(this);
        }


        /**
         * @param Number
         * @return String
         */
        this.string.enforceMax = function(limit) 
        {
            return this.truncate(limit, false)
        }

        /**
         * @param Number
         * @return Boolean
         */ 
        this.string.checkMin = function(limit) 
        {
            return (this.length <= limit)
        }

        /**
         * @param Number
         * @return Boolean
         */ 
        this.string.checkMax = function(limit) 
        {
            return (this.length >= limit)
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
        this.string.isPhoneNumber = function()
        {
            let expression = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im

            return expression.test(this)
        }

        /**
         * @return Boolean
         */
        this.string.isUrl = function()
        {
            let expression = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
            
            return expression.test(this);
        }

        /**
         * @return Boolean
         */
        this.string.isEmail = function()
        {
            let expression = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          
            return expression.test(this);
        }

        /**
         * @return String
         */
        this.string.toSnakeCase = function()
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
        this.string.toTextCase = function() 
        {
            return this
        }

        /**
         * @return String
         */
        this.string.toCamelCase = function()
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
        this.string.replaceUnderscoresForSpaces = function ()
        {

            return this.underscoreSpaces()
        }

        /**
         * @return String
         */
        this.string.underscoreSpaces = function()
        {
            if(this.length === 0) return this
            
            return this.replace(/\s/g, '_')
        }

        /**
         * @return String
         */
        this.string.capitalize = function()
        {
            
            return this.charAt(0).toUpperCase() + this.slice(1)

        }

        /**
         * @param String
         *
         * @return Boolean
         */
        this.string.matches = function(string)
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
        this.string.truncate = function(limit, dots = true)
        {
            let truncated = this.substring(0, limit) 

            truncated = (dots) ? truncated + '...' : truncated

            return (this.length > limit) ? truncated : this.slice(0, this.length)
        }

        /**
         * @return String
         */
        this.string.empty = function()
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
        this.string.trimRight  = function()
        {
            
            return this.replace(/\s+$/g, '');

        }

        /**
         *
         * @param character
         * @returns {string}
         */
        this.string.removeCharacter = function(character)
        {
            
            return this.replace(character, "")

        }

        /**
         *
         * @return String
         */
        this.string.trimLeft = function()
        {
            
            return this.replace(/^\s+|\s+$/g, '');

        }

        /**
         *
         * @return String
         */
        this.string.trimBoth = function()
        {
           
            return this.trimRight().trimLeft()

        }


        return this.string = string
    }
}

export default function(array) {
    return new Stringify(array).string
}
