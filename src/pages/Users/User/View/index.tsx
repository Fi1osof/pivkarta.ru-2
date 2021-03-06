import React, { useCallback, useContext, useMemo, useState } from 'react'
import { UserViewProps } from './interfaces'
import { UserViewStyled } from './styles'
// import Link from 'next/link'
import Typography from 'material-ui/Typography'
import Context, { PrismaCmsContext } from '@prisma-cms/context'
import IconButton from 'material-ui/IconButton'
import SaveIcon from 'material-ui-icons/Save'
import ResetIcon from 'material-ui-icons/Restore'
import EditIcon from 'material-ui-icons/ModeEdit'
import TextField from 'material-ui/TextField'
import Uploader, { UploaderProps } from '@prisma-cms/uploader'
import { Grid } from '@material-ui/core'
import { imageFormats } from 'src/helpers/imageFormats'
import { UserFragment } from 'src/modules/gql/generated'

const UserView: React.FC<UserViewProps> = ({ user, ...other }) => {
  const context = useContext(Context) as PrismaCmsContext

  const currentUser = context.user

  const isCurrentUser = user ? user.id === currentUser?.id : false

  /**
   * Измененные данные пользователя
   */

  const [data, setData] = useState<Partial<UserFragment> | null>(null)

  // const inEditMode = useMemo(() => {
  //   return data ? true : false
  // }, [data])

  const userEdited = useMemo(() => {
    return data && user
      ? {
          ...user,
          ...data,
        }
      : user
  }, [data, user])

  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target

    if (!name) {
      return
    }

    // setData({
    //   ...data,
    //   [name]: value,
    // })
  }, [])

  /**
   * Переводим в режим редактирования
   */
  const startEdit = useCallback(() => {
    if (!data) {
      setData({})
    }
  }, [data])

  /**
   * Сброс изменений
   */
  const reset = useCallback(() => {
    if (data) {
      setData(null)
    }
  }, [data])

  /**
   * Функция на обновление пользователя
   */
  const inRequest = false
  // const [mutate, { loading: inRequest }] = useUpdateUserProcessorMutation({
  //   onCompleted: (data) => {
  //     /**
  //      * Если запрос выполнился успешно, сбрасываем редактирование
  //      */
  //     if (data.updateUserProcessor.success) {
  //       reset()
  //     }
  //   },
  // })

  const save = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault()

      if (!data || !user?.id) {
        return
      }

      // mutate({
      //   variables: {
      //     data,
      //     where: {
      //       id: user.id,
      //     },
      //   },
      // })
    },
    [data, user?.id]
  )

  /**
   * Уведомления
   */
  // const notifications = useMemo(() => {
  //   if (!user?.NotificationTypes || !isCurrentUser || !inEditMode) {
  //     return null
  //   }

  //   return (
  //     <UserNotifications
  //       NotificationTypes={user.NotificationTypes}
  //       userId={user.id}
  //     />
  //   )
  // }, [inEditMode, isCurrentUser, user.NotificationTypes, user.id])

  const buttons = useMemo(() => {
    if (!user?.id || !isCurrentUser) {
      return null
    }

    const buttons: JSX.Element[] = []

    if (data) {
      const isDirty = Object.keys(data).length

      buttons.push(
        <IconButton
          key="ResetIcon"
          onClick={reset}
          disabled={inRequest}
          title="Отменить изменения"
        >
          <ResetIcon />
        </IconButton>
      )

      isDirty &&
        buttons.push(
          <IconButton
            key="SaveIcon"
            type="submit"
            disabled={inRequest}
            color="secondary"
            title="Сохранить пользователя"
          >
            <SaveIcon />
          </IconButton>
        )
    } else {
      buttons.push(
        <IconButton
          key="EditIcon"
          onClick={startEdit}
          title="Редактировать пользователя"
        >
          <EditIcon />
        </IconButton>
      )
    }

    return buttons
  }, [user?.id, isCurrentUser, data, reset, inRequest, startEdit])

  // const password = useMemo(() => {
  //   if (!data) {
  //     return null
  //   }

  //   return (
  //     <TextField
  //       name="password"
  //       value={userEdited?.password || ''}
  //       onChange={onChange}
  //       label="Новый пароль"
  //       type="password"
  //       fullWidth
  //     />
  //   )
  // }, [data, onChange, userEdited?.password])

  const email = useMemo(() => {
    if (!data) {
      return null
    }

    return (
      <TextField
        name="email"
        value={userEdited?.email || ''}
        onChange={onChange}
        label="Емейл"
        type="email"
        fullWidth
      />
    )
  }, [data, onChange, userEdited?.email])

  const fullname = useMemo(() => {
    if (!data) {
      return null
    }

    return (
      <TextField
        name="fullname"
        value={userEdited?.fullname || ''}
        onChange={onChange}
        label="ФИО"
        fullWidth
      />
    )
  }, [data, onChange, userEdited?.fullname])

  /**
   * Обработчик на загрузку картинки
   */
  const onUpload: UploaderProps['onUpload'] = useCallback((result) => {
    const image = result.data.singleUpload?.path

    if (image) {
      // setData({
      //   ...data,
      //   image,
      // })
    }

    return
  }, [])

  const avatar = useMemo(() => {
    return (
      <>
        {userEdited.image ? (
          <img
            src={imageFormats(userEdited.image, 'thumb')}
            className="avatar"
          />
        ) : null}

        {data ? (
          <Uploader name="image" onUpload={onUpload} multiple={false} />
        ) : null}
      </>
    )
  }, [onUpload, userEdited, data])

  const form = useMemo(() => {
    return (
      <form onSubmit={save}>
        <UserViewStyled {...other}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs>
                  <Typography variant="title">
                    {userEdited?.fullname || userEdited?.username}
                  </Typography>
                </Grid>

                <Grid item>{buttons}</Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              {avatar}
            </Grid>

            {fullname ? (
              <Grid item xs={12} md={4}>
                {fullname}
              </Grid>
            ) : null}

            {email ? (
              <Grid item xs={12} md={4}>
                {email}
              </Grid>
            ) : null}

            {/* {password ? (
              <Grid item xs={12} md={4}>
                {password}
              </Grid>
            ) : null} */}

            {/* {notifications ? (
              <Grid item xs={12}>
                {notifications}
              </Grid>
            ) : null} */}
          </Grid>
        </UserViewStyled>
      </form>
    )
  }, [
    avatar,
    buttons,
    email,
    fullname,
    save,
    userEdited?.fullname,
    userEdited?.username,
    other,
  ])

  return useMemo(() => {
    return <>{form}</>
  }, [form])
}

export default UserView
