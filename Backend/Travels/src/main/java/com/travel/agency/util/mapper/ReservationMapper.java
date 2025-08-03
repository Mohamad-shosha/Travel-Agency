package com.travel.agency.util.mapper;

import com.travel.agency.dto.ReservationDto;
import com.travel.agency.entities.Reservation;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {TripMapper.class})
public interface ReservationMapper {

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "user.name", target = "userName")
    @Mapping(source = "user.alternateEmail" , target = "userEmail")
    @Mapping(source = "user.phoneNumber",target = "userPhoneNumber")
    @Mapping(source = "trip", target = "tripDTO")
    @Mapping(source = "cancellationReason", target = "cancellationReason")
    ReservationDto toDto(Reservation reservation);
}
