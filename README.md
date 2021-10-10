package com.timewastingguru.velovod;

import android.media.Rating;

import com.google.gson.JsonObject;
import com.timewastingguru.velovod.model.AppPlatform;
import com.timewastingguru.velovod.model.BasicWrapper;
import com.timewastingguru.velovod.model.Geo;
import com.timewastingguru.velovod.model.Media;
import com.timewastingguru.velovod.model.OneRating;
import com.timewastingguru.velovod.model.OutputUser;
import com.timewastingguru.velovod.model.Quest;
import com.timewastingguru.velovod.model.QuestHistory;
import com.timewastingguru.velovod.model.QuestInfo;
import com.timewastingguru.velovod.model.Route;
import com.timewastingguru.velovod.model.RouteInfo;
import com.timewastingguru.velovod.model.TeamMate;
import com.timewastingguru.velovod.model.User;

import java.util.List;

import io.reactivex.Single;
import okhttp3.MultipartBody;
import okhttp3.RequestBody;
import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.Field;
import retrofit2.http.FormUrlEncoded;
import retrofit2.http.GET;
import retrofit2.http.Headers;
import retrofit2.http.Multipart;
import retrofit2.http.POST;
import retrofit2.http.Part;
import retrofit2.http.Path;
import retrofit2.http.Query;

/\*\*

- Created by askellio on 3/19/18.
  \*/

public interface HttpApi {
@GET("info/minSDK")
Single<BasicWrapper<AppPlatform>> getMinAppVersion ();

    @FormUrlEncoded
    @POST("login")
    Single<BasicWrapper<JsonObject>> auth (@Field("email") String email,
                                           @Field("password") String password);

    @FormUrlEncoded
    @POST("auth/vk")
    Single<BasicWrapper<JsonObject>> authVK (
            @Field("token") String token,
            @Field("email") String email
    );

    @FormUrlEncoded
    @POST("auth/facebook")
    Single<BasicWrapper<JsonObject>> authFB (
            @Field("token") String token,
            @Field("email") String email
    );

    @FormUrlEncoded
    @POST("registration")
    Single<BasicWrapper<JsonObject>> reg (@Field("name") String name,
                                          @Field("email") String email,
                                          @Field("password") String password,
                                          @Field("password_confirmation") String repeatPassword);

    @POST("logout")
    Single<BasicWrapper<JsonObject>> logout ();

    @FormUrlEncoded
    @POST("c_route/items")

// Single<ResponseBody> getRoutes (@Field("offset") Integer offset,
Single<BasicWrapper<Route>> getRoutes (@Field("offset") Integer offset,
@Field("limit") Integer limit);

    @FormUrlEncoded
    @POST("c_route/lite/items")

// Single<ResponseBody> getRoutes (@Field("offset") Integer offset,
Single<BasicWrapper<Route>> getLiteRoutes (@Field("offset") Integer offset,
@Field("limit") Integer limit);
/\*\*
_ Получить квесты по id места (города)
_ @param offset
_ @param limit
_ @param city
_ @return
_/
@FormUrlEncoded
@POST("c_route/lite/items")
Single<BasicWrapper<Route>> getLiteRoutes (
@Field("offset") Integer offset,
@Field("limit") Integer limit,
@Field("city") String city
);

    /**
     * Получить ближайшие маршруты - сортировка по удалению от точки
     * @param offset
     * @param limit
     * @param latitude
     * @param longitude
     * @return
     */
    @FormUrlEncoded
    @POST("c_route/lite/items")
    Single<BasicWrapper<Route>> getLiteRoutes (
            @Field("offset") Integer offset,
            @Field("limit") Integer limit,
            @Field("latitude") double latitude,
            @Field("longitude") double longitude
    );


    @FormUrlEncoded
    @POST("c_route/item")

// Single<ResponseBody> getRouteInfo (@Field("item_id") Integer id);
Single<BasicWrapper<RouteInfo>> getRouteInfo (@Field("item_id") Integer id);

    @FormUrlEncoded
    @POST("c_user/item")

// Single<ResponseBody> getUser (@Field("item_id") Long id);
Single<BasicWrapper<User>> getUser (@Field("item_id") Long id);

    @POST("c_user/edit")

// Single<ResponseBody> getUser (@Field("item_id") Long id);
Single<BasicWrapper<User>> editUser (
@Body OutputUser user
);

    @POST("c_user/item")

// Single<ResponseBody> getUser (@Field("item_id") Long id);
Single<BasicWrapper<User>> getUser ();

    @FormUrlEncoded
    @POST("c_quest/lite/items")

// Single<ResponseBody> getRoutes (@Field("offset") Integer offset,
Single<BasicWrapper<Quest>> getLiteQuests (@Field("offset") Integer offset,
@Field("limit") Integer limit);

    @FormUrlEncoded
    @POST("c_quest/lite/items")
    Single<BasicWrapper<Quest>> getQuests (@Field("offset") Integer offset,
                                           @Field("limit") Integer limit);

    /**
     * Получить квесты по id места (города)
     * @param offset
     * @param limit
     * @param osm_id
     * @return
     */
    @FormUrlEncoded
    @POST("c_quest/lite/items")
    Single<BasicWrapper<Quest>> getQuests (
            @Field("offset") Integer offset,
            @Field("limit") Integer limit,
            @Field("osm_id") Long osm_id
    );

    /**
     * Получить ближайшие маршруты - сортировка по удалению от точки
     * @param offset
     * @param limit
     * @param latitude
     * @param longitude
     * @return
     */
    @FormUrlEncoded
    @POST("c_quest/lite/items")
    Single<BasicWrapper<Quest>> getQuests (
            @Field("offset") Integer offset,
            @Field("limit") Integer limit,
            @Field("latitude") double latitude,
            @Field("longitude") double longitude
    );

    @FormUrlEncoded
    @POST("c_quest/item")
    Single<BasicWrapper<QuestInfo>> getQuestInfo (@Field("item_id") Integer id);

    @FormUrlEncoded
    @POST("c_quest/play/current/answer")
    Single<BasicWrapper<QuestHistory>> postAnswer (@Field("item_id") Integer questId,
                                     @Field("answer") String answer);

    @FormUrlEncoded
    @POST("c_quest/play/current/position")
    Single<BasicWrapper<QuestHistory>> postLocation (@Field("item_id") Integer questId,
                                       @Field("longitude") double longitude,
                                       @Field("latitude") double latitude);

    @FormUrlEncoded
    @POST("c_quest/play")
    Single<BasicWrapper<QuestInfo>> playQuest (@Field("item_id") Integer questId);

    @FormUrlEncoded
    @POST("c_quest/play/current/users")
    Single<BasicWrapper<TeamMate>> getTeamPos (@Field("item_id") Integer questId);

    @FormUrlEncoded
    @POST("c_quest/play/current/points")
    Single<BasicWrapper<QuestInfo>> getQuestHistory (@Field("item_id") Integer questId);

    /**
     * Загрузка фотографии на сайт
     * @param file
     * @return
     */
    @Multipart
    @POST("c_media/add")
    Single<Media> uploadMedia(
            @Part MultipartBody.Part file
    );

    /**
     * Определение гео-данных - Города, района и т.д.
     * @param location - строка для поиска (можно имя улицы, или координаты через запятую (lat,lon)
     * @param format - "json"
     * @param addressdetails - 1
     * @param limit - 1
     * @return
     */
    @GET("https://nominatim.openstreetmap.org/search/{location}")
    Single<List<Geo>> getGeo (@Path("location") String location, @Query("format") String format, @Query("addressdetails") Integer addressdetails, @Query("limit") int limit);

    @FormUrlEncoded
    @POST("c_quest/setRating")
    Single<BasicWrapper<OneRating>> postQuestRating (@Field("item_id") Integer questId, @Field("value") float value);

}
