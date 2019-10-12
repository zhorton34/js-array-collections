import { Stringify, Collect, Numberfy }from '../src/index.js';
window.Collect = Collect
window.Stringify = Stringify
window.Numberfy = Numberfy

window.mock = {
	number: {
		negative: -5,
		positive: 5,
		decimal: 5.234,
	},
	strings: {
		email: 'tester@gmail.com',
		invalidEmail: 'testing.no.atsign.com',
		phoneNumber: '555 555-5555',
		invalidPhoneNumber: '555 555,5555',
		name: 'Timmy Joe Bob',
		leftSpace: ' Timmy Joe Bob',
		rightSpace: 'Timmy Joe Bob ',
		leftAndRightSpace: ' Timmy Joe Bob ',
		emptyString: '',
		underscores: 'snake_case',
		spaces: 'snake case',
		title: 'Snake Case',
		url: 'https://google.com',
		invalidUrl: 'htpps://google@com',
		snakeCase: 'snake_case',
		camelCase: 'camelCase',
		date: '12-22-2015',
		lowerCase: 'was lower case',
		upperCase: 'Was Upper Case',
	},
	collection: {
		pluck: 'name',
		doesNotincludeProperty: 'dadsfasdfawefsdfaewsdf',
		person: {
			id: 4,
			name: 'added person',
			email: 'added@gmail.com',
			favorite_number: 0,
		},
		people: [
			{
		   		id: 0,
		   		name: 'james',
		   		email: 'james@gmail.com',
		   		favorite_number: 3,
		 	},
		 	{
		   		id: 1,
		   		name: 'sarah',
		   		email: 'sarah@gmail.com',
		   		favorite_number: 53,
		 	},
		 	{
	   			id: 2,
	   			name: 'rilie',
	   			email: 'rilie@gmail.com',
	   			favorite_number: 452,
    	   }
	   ]
	}
};

window.test = {
	stringify: {
		instance() {
			return Stringify('string')
		},
		isDate() {
			return Stringify(mock.strings.date).isDate()
		},
		enforceMax() {
			return Stringify('shortend string here (if you see the paranthases this test failed)').enforceMax(20)
		},
		checkMin() {
			const fails = (Stringify('fail').checkMin(4) === false) 
			const passes = (Stringify('pass').checkMin(2) === true)
			return ![fails, passes].includes(false)
		},
		checkMax() {
			const fails = (Stringify('fail').checkMax(2) === false) 
			const passes = (Stringify('pass').checkMax(2) === true)
			return ![fails, passes].includes(false)
		},
		isPhoneNumber() {
			return Stringify(mock.strings.phoneNumber).isPhoneNumber() && !Stringify(mock.strings.invalidPhoneNumber).isPhoneNumber()
		},
		isUrl() {
			return Stringify(mock.strings.url).isUrl() && !Stringify(mock.strings.invalidUrl).isUrl()
		},
		toSnakeCase() {
			return [
				Stringify(mock.strings.camelCase).toSnakeCase(),
				Stringify(mock.strings.title).toSnakeCase(),
			];			
		},
		underscoreSpaces() {
			return [
				Stringify(mock.strings.snakeCase).underscoreSpaces()
			];
		},
		capitalize() {
			return Stringify(mock.strings.lowerCase).capialize()
		},
		matches() {
			return Stringify(mock.strings.email).matches(mocks.strings.email)
		},
		truncate() {
			return Stringify('Truncate Here (shouldnt see anything in paranthases)').truncate(14)
		},
		empty() {
			return Stringify(mock.strings.empty).empty()
		},
		trimRight() {
			return Stringify(mock.strings.trimRight).trimRight()
		},
		trimLeft() {
			return Stringify(mock.strings.trimLeft).trimLeft()
		},
		removeCharacter() {
			return Stringify(mock.strings.email).removeCharacter('@')
		},
		trimBoth() {
			return Stringify(mocks.strings.leftAndRightSpace).removeBoth()
		}
	},
	collection: {
		instance() { 
			return Collect(mock.collection.people) 
		},
		pluck() {
			return Collect(mock.collection.people).pluck(mock.collection.pluck)
		},
		append() {
			return Collect(mock.collection.people).length === mock.collection.people.length 
				&& Collect(mock.collection.people).append(mock.collection.person).length === mock.collection.people.length + 1
		},
		orderBy() {		    
		    let lastId = null
		    let passing;
	     	
	     	Collect(mock.collection.people).orderBy('id', 'desc').forEach(({ id }) => {
		    	if (id === null) {
		    	   lastId = id
		    	   return
		    	}
		    	if (lastId === null) {
		    		passing = false
	    		}
	    		passing = id >= lastId 
		    })

		    return passing
		},
		doesNotIncludeProperty() {
			return Collect(mock.collection.people).doesNotIncludeProperty(mock.collection.doesNotIncludeProperty)
		},
		onlyHasUnique() {
			const duplicate = mock.collection.doesNotIncludeProperty 
			
			return Collect([ ...mock.people, duplicate, duplicate ]).onlyHasUnique('id')
		}
	},
	numberify: {
		instance() {
			return Numberfy(1)
		},
		is() {
			const testAgainst = 5

			return Numberfy(5).is(5)
		},
		isBetween() {
			const below = 3
			const above = 5
			return Numberfy(4).isBetween(below, above)
		},
		isBetweenOrEquals() {
			return Numberfy(4).isBetweenOrEquals(3, 5) && Numberfy(4).isBetweenOrEquals(4, 5)
		},
		isFirstIn() {
			const array = [0, 1, 2]
			return Numberfy(0).isFirstIn(array) && !Numberfy(1).isFirstIn(array)
		},
		isLengthOf() {
			const array = [0, 1, 2, 3, 4, 5, 6]
			return Numberfy(array.length).isLengthOf(array.length)
		},
		isNotLastIn() {
			const array = [0, 1, 2, 3, 4]
			return Numberfy(2).isNotLastIn(array)
		},
		isLastIn() {
			const array = [0, 1, 2, 3, 4]
			return Numberfy(4).isNotLastIn(array)
		},
		matchesAll() {
			return Numberfy(1).matchesAll([1]) && !Numberfy(1).matchesAll([1, 2, 3])
		},
		matchesAny() {
			return Numberfy(1).matchesAny([1, 2, 3, 4]) && !Numberfy(1).matchesAny([2, 3, 4])
		}
	}
}

