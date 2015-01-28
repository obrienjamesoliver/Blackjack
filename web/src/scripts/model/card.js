define( function() {

    function Card(cValue, sValue, fValue) {

        var countValues = cValue || [],
            suitValue = sValue || '',
            faceValue = fValue || '';

        return {

            countValues: countValues,
            suitValue: suitValue,
            faceValue: faceValue

        };
    }

    return Card;

});