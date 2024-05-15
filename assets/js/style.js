const apiKeyExercise = 'KRiBu1FU5pYxZRYw9odnPw==aBckCVxKaIbru7UP';
const apiKeyNutrition = 'KRiBu1FU5pYxZRYw9odnPw==1qW9WQ981f09Y6Ls';

function searchMuscle() {
    const muscle = document.getElementById('muscle').value.trim();
    if (muscle === '') {
        alert('Please enter a valid muscle!');
        return;
    }

    fetch(`https://api.api-ninjas.com/v1/exercises?muscle=${muscle}`, {
        headers: {
            'X-Api-Key': apiKeyExercise
        }
    })
    .then(response => response.json())
    .then(data => {
        showExercises(data);
    })
    .catch(error => {
        console.error('Error fetching exercises:', error);
    });
}

function showExercises(exercises) {
    const exercisesDiv = document.getElementById('exercises');
    exercisesDiv.innerHTML = '';

    if (exercises.length === 0) {
        const noResultsMessage = document.createElement('p');
        noResultsMessage.textContent = 'No workouts found for the specified muscle.';
        exercisesDiv.appendChild(noResultsMessage);
    } else {
        const exerciseList = document.createElement('ul');
        exercises.forEach(item => {
            const exerciseItem = document.createElement('li');
            exerciseItem.textContent = item.name;

            const addButton = document.createElement('button');
            addButton.textContent = "Add";
            addButton.classList.add('add-button')
            addButton.addEventListener('click', function() {
                addExercise(item.name);
                alert('Added!')
            });

            const buttonWrapper = document.createElement('div');
            buttonWrapper.classList.add('add-button-wrapper');
            buttonWrapper.appendChild(addButton);

            exerciseItem.appendChild(buttonWrapper);

            exerciseList.appendChild(exerciseItem);
        });
        exercisesDiv.appendChild(exerciseList);
    }
}


function showExercisesPage(exercises) {
    const exercisesDiv = document.getElementById('exercises');
    exercisesDiv.innerHTML = '';

    exercises.forEach(item => {
        const exerciseListItem = document.createElement('li');
        exerciseListItem.textContent = item.name;

        const addButton = document.createElement('button');
        addButton.textContent = "Add";
        addButton.addEventListener('click', function() {
            addExercise(item.name); 
        });

        exerciseListItem.appendChild(addButton);

        exercisesDiv.appendChild(exerciseListItem);
    });
}

function addExercise(exerciseName) {
    let selectedExercises = localStorage.getItem('selectedExercises');
    if (!selectedExercises) {
        selectedExercises = [];
    } else {
        selectedExercises = JSON.parse(selectedExercises);
    }

    selectedExercises.push(exerciseName);
    localStorage.setItem('selectedExercises', JSON.stringify(selectedExercises));
}

function navigateToSelectedExercisesPage() {
    const selectedExercises = JSON.parse(localStorage.getItem('selectedExercises'));
    if (selectedExercises && selectedExercises.length > 0) {
        window.location.href = `selectedExercisesPage.html?exercises=${JSON.stringify(selectedExercises)}`;
    } else {
        alert('No exercises selected!');
    }
}






function displaySelectedExercises() {
    const selectedExercises = JSON.parse(localStorage.getItem('selectedExercises'));
    const exercisesDiv = document.getElementById('selectedExercises');
    exercisesDiv.innerHTML = '';

    if (selectedExercises && selectedExercises.length > 0) {
        const exerciseList = document.createElement('ul');
        selectedExercises.forEach(exercise => {
            const exerciseItem = document.createElement('li');
            exerciseItem.classList.add('title', 'has-text-black', 'is-size-4', 'exercise-list-class')
            exerciseItem.textContent = exercise;
            exerciseList.appendChild(exerciseItem);
        });
        exercisesDiv.appendChild(exerciseList);
    } else {
        const noExercisesMessage = document.createElement('p');
        noExercisesMessage.classList.add('title', 'has-text-black', 'is-size-4')
        noExercisesMessage.textContent = 'No exercises selected!';
        exercisesDiv.appendChild(noExercisesMessage);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById('muscle-button')) {
        document.getElementById('muscle-button').addEventListener('click', searchMuscle);
    }
    if (document.getElementById('viewWorkoutsBtn')) {
        document.getElementById('viewWorkoutsBtn').addEventListener('click', navigateToSelectedExercisesPage);
    }
    if (document.getElementById('nutritionSearch-button')) {
        document.getElementById('nutritionSearch-button').addEventListener('click', searchNutrition);
    }
    if (document.getElementById('selectedExercises')) {
        displaySelectedExercises();
    }
});







function searchNutrition() {
    const food = document.getElementById('nutritionSearch').value.trim();
    if (food === '') {
        alert('Please enter a valid food item!');
        return;
    }

    fetch(`https://api.calorieninjas.com/v1/nutrition?query=${food}`, {
        headers: {
            'X-Api-Key': apiKeyNutrition
        }
    })
    .then(response => response.json())
    .then(data => {
        showNutrition(data.items);
    })
    .catch(error => {
        console.error('Error fetching nutrition data:', error);
    });
}





function showNutrition(nutrition) {
    console.log(nutrition, !Array.isArray(nutrition));

    const nutritionDiv = document.getElementById('nutrition');
    nutritionDiv.innerHTML = '';


    if (!Array.isArray(nutrition)) {
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'Error: Invalid response format.';
        nutritionDiv.appendChild(errorMessage);
        return;
    }

    const nutritionList = document.createElement('ul');

    if (nutrition.length === 0) {
        const noResultsMessage = document.createElement('p');
        noResultsMessage.textContent = 'No nutrition data found for the specified food item.';
        nutritionDiv.appendChild(noResultsMessage);
    } else {
        nutrition.forEach(item => {
            const nutritionItemName = document.createElement('li');
            const nutritionItemCalories = document.createElement('li');

            function capitalizeFirstLetter(string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            }
            
            if (item.name) {
                const capitalizedItemName = capitalizeFirstLetter(item.name);
                nutritionItemCalories.textContent = `Calories: ${item.calories}`;
                nutritionItemName.textContent = `Name: ${capitalizedItemName}`;
            } else {
                nutritionItem.textContent = 'Invalid nutrition data';
            }
            nutritionList.appendChild(nutritionItemName);
            nutritionList.appendChild(nutritionItemCalories);
        });
        nutritionDiv.appendChild(nutritionList);
    }
}