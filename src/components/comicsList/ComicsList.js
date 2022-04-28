import './comicsList.scss';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';
import { useEffect, useState } from 'react'
import Spinner from '../spinner/Spinner';

const ComicsList = () => {
    const {loading, error, getComics} = useMarvelService();
    const [comicsList, setComicList] = useState([]);
    const [offset, setOffset] = useState(210);
    

    const onRequest = (offset) => {
        getComics(offset)
            .then(onComicsLoaded)
    }
    const onComicsLoaded = (newComicList) => {
        setComicList(comicsList => [...comicsList, ...newComicList]);
        setOffset(offset + 8)
    }
    useEffect(() => {
        onRequest(offset);
    }, [])

    function renderItems(arr) {
        const items =  arr.map((item, i) => {
            return (
                <li 
                    className="comics__item"
                    key={item.id}
                    >
                        <a href="/#/">
                            <img src={item.thumbnail} alt="ultimate war" className="comics__item-img"/>
                            <div className="comics__item-name">{item.name}</div>
                            <div className="comics__item-price">777.77$</div>
                        </a>
                </li>
            )
        });
        // А эта конструкция вынесена для центровки спиннера/ошибки
        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }
    const items = renderItems(comicsList);
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    return (
        <div className="comics__list">
                {errorMessage}
                {spinner}
                {items}
            <button onClick={() => onRequest(offset)} className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;