package com.travel.agency.repositories;

import com.travel.agency.entities.City;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "cities")
public interface CityRepository extends JpaRepository<City,Integer> {
}
