function skillsMember(){
    return {
        name: 'Member',
        skills: ['eat', 'sleep', 'code'],
        eat: function(){
            console.log('I am eating');
        },
        sleep: function(){
            console.log('I am sleeping');
        },
        code: function(){
            console.log('I am coding');
        }
    };
}