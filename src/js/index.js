import Search from './models/Search';
import {elements, renderLoader , clearLoader} from './views/base';
import * as searchView from './views/searchView';

const state = {};

const controlSearch = async () => {

	const query = searchView.getInput();
	console.log(query);

	//Get query
	if (query) {

		//New search object
		state.search = new Search(query);

		//Prepar UI
		searchView.clearInput();
		searchView.clearResults();
		renderLoader(elements.searchRes);

		//Search for Recipe
		await state.search.getResults();

		//Send it back to UI
		clearLoader();
		searchView.renderResults(state.search.data);

	}
};

elements.searchForm.addEventListener('submit', e => {
	e.preventDefault();
	controlSearch();
});

elements.searchResPages.addEventListener('click', e=>{
	const btn = e.target.closest('.btn-inline');
	if(btn){
		const goToPage = parseInt(btn.dataset.goto, 10);
		searchView.clearResults();
		searchView.renderResults(state.search.data, goToPage);
	}
});




