import React, { useContext, useState } from 'react'
import { PlayerContext } from '../../store/playerContext'
import { useNavigate } from 'react-router-dom'
import styles from './PlaylistItem.module.css'

const PlaylistItem = (props) => {
  const ctx = useContext(PlayerContext)
  let navigate = useNavigate()

  const playListHandler = () => {
    if (props.create) {
      console.log('modal')
      props.setModalHandler(true)
      return
    }
    ctx.setPlaylistPage(props.playlist)
    navigate(`/playlist`)
  }

  const deletePlaylist = async () => {
    let res = await fetch(
      `/api/playlist//deleteplaylist/${props.playlist._id}`,
      {
        method: 'DELETE',
      }
    )
    let resp = await res.json()
    console.log(resp)
  }

  return (
    <div className={styles.container} onClick={playListHandler}>
      <figure className={styles.figure}>
        {console.log(props.playlist)}
        {props.create ? (
          <div className={styles.plus}>
            <i className='far fa-plus'></i>
          </div>
        ) : props.playlist.songs.length > 0 ? (
          <img
            className={styles.img}
            src={
              props.playlist.songs?.length < 1
                ? ''
                : props.playlist.songs[0].thumbnails[0].url
            }
            alt='photo'
          />
        ) : (
          <div className={styles.phone}>
            <i className='fas fa-headphones-alt'></i>
          </div>
        )}
      </figure>
      <div className={styles.name}>
        <p>
          {!props.create ? props.playlist.playlist_name : 'Create new playlist'}
        </p>
      </div>
      {!props.create && (
        <div className={styles.options} onClick={deletePlaylist}>
          <i className='fas fa-trash-alt'></i>
        </div>
      )}
    </div>
  )
}

export default PlaylistItem
