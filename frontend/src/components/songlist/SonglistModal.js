import React, { useEffect, useContext, useState } from 'react'
import { useParams } from 'react-router'
import styles from './SonglistModal.module.css'
import AuthContext from '../../store/auth-context'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { PlayerContext } from '../../store/playerContext'

const SongListModal = (props) => {
  const auth = useContext(AuthContext)
  const player = useContext(PlayerContext)
  let param = useParams()
  const [list, setlist] = useState([])

  useEffect(() => {
    if (!auth.user) return
    setlist(auth.user.playlists)
  }, [auth.user])

  const playlistHandler = async (name) => {
    if (!props.song) return
    let response = await fetch(`/api/playlist/update/${name}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(props.song),
    })
    let res = await response.json()
    auth.updatePlaylistSongs(res)
    toast.success('Song added to playlist', {
      autoClose: 2500,
      hideProgressBar: true,
    })
  }

  const deleteSongHandler = async () => {
    let response = await fetch(
      `/api/playlist/delete/${param.id}/${props.song.videoId}`,
      {
        method: 'DELETE',
      }
    )
    let res = await response.json()
    auth.updatePlaylistSongs(res)
    // player.setSongPlaylists()
  }

  let playlistOptions = <button onClick={deleteSongHandler}>delete</button>

  return (
    <div className={styles.modal}>
      <h2 className={styles.header}>
        {' '}
        {props.playlist ? 'Remove song' : 'Add to playlist'}
      </h2>
      {props.playlist && playlistOptions}
      {!props.playlist &&
        list.map((playlist, index) => {
          return (
            <button
              key={index}
              onClick={() => playlistHandler(playlist.playlist_name)}
            >
              {playlist.playlist_name}
            </button>
          )
        })}
    </div>
  )
}

export default SongListModal
